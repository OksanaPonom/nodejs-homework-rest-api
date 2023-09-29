const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const { JWT_KEY } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (!authorization || authorization === "") {
    next(HttpError(401));
  }

  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, JWT_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }

    req.user = user;

    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authenticate;
