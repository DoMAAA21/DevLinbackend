const multer = require("multer");

const path = require("path");

const upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 },

  storage: multer.diskStorage({}),

  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();

    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);

      return;
    }

    cb(null, true);
  },
});

module.exports = upload;

// const express = require('express')
// const app = express()
// const path = require('path')
// const multer = require('multer')

// var filestorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null,'./uploads')
//     },
//     filename:(req,file, cb) => {
//         cb(null,"[maues]-" + file.originalname)
//     }
// })

// module.exports = multer({
//     storage:filestorageEngine
// })

