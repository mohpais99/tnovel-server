const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/../uploads/poster/'));
    },
    filename: (req, file, cb) => {
        let filename = file.originalname.replace(/\s+/g, '-').toLowerCase();
        cb(null, filename);
    },
});

let uploadPoster = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    },
}).single("file");

let uploadPosterMiddleware = util.promisify(uploadPoster);

module.exports = uploadPosterMiddleware;