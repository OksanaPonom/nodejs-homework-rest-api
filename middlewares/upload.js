const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 10, // обмеження розміру файлу (до 10 мегабайт)
};

const upload = multer({
  storage: multerConfig,
  limits,
});

module.exports = upload;
