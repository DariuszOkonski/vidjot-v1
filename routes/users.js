const express = require("express");

const routerUsers = express.Router();

routerUsers.get("/login", (req, res) => {
  res.render("users/login");
});

routerUsers.get("/register", (req, res) => {
  res.render("users/register");
});

module.exports = routerUsers;
