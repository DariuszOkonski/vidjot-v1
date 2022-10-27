const express = require("express");

const routerMain = express.Router();

routerMain.get("/", (req, res) => {
  const title = "Welcome";
  return res.render("index", {
    title,
  });
});

routerMain.get("/about", (req, res) => {
  return res.render("about");
});

module.exports = routerMain;
