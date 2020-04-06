// Dependencies

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

/******************
 ***INDEX ROUTES***
 ******************/

router.get("/", (req, res) => {
  res.type("html");
  fs.readFile("../client/build/index.html", (err, data) => {
    res.send(data);
  });
});

router.get("/static/:folder/:filename", (req, res) => {
  const { folder, filename } = req.params;

  fs.readFile(`../client/build/static/${folder}/${filename}`, (err, data) => {
    if (folder === "media") {
    } else {
      res.type(folder);
    }
    res.send(data);
  });
});

router.get("/:file", (req, res) => {
  const { file } = req.params;
  const extension = path.extname(file);

  if (extension) {
    res.type(extension);
    fs.readFile(`../client/build/${file}`, (err, data) => {
      res.send(data);
    });
  } else {
    res.type("html");
    fs.readFile("../client/build/index.html", (err, data) => {
      res.send(data);
    });
  }
});

module.exports = router;
