const express = require("express");
const multer = require("multer");
const fs = require("fs");

let router = express.Router();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpegor png"), false);
  }
};

// image
var storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    let d = new Date();
    var dir = `uploads`;
    console.log(dir);
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (err) {
      console.error(err);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let typeFile = file.originalname.split(".");
    cb(null, file.fieldname + "-" + Date.now() + "." + typeFile.pop());
  },
});

// image
var storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    let d = new Date();
    var dir = `uploads`;
    console.log(dir);
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    } catch (err) {
      console.error(err);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    let typeFile = file.originalname.split(".");
    cb(null, file.fieldname + "-" + Date.now() + "." + typeFile.pop());
  },
});

var uploadImage = multer({
  storage: storageImage,
  fileFilter: fileFilter,
});

router.post("/", uploadImage.single("image"), async (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    return res.status(200).send(req.file);
  }
  res.status(400).send({
    status: "fail",
  });
});

module.exports = router;
