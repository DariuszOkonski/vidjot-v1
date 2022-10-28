const express = require("express");
const mongoose = require("mongoose");
// const flash = require("connect-flash");
const { ensureAuthenticated } = require("../helpers/auth");

const routerIdeas = express.Router();

require("../models/Idea");
const Idea = mongoose.model("ideas");

routerIdeas.get("/", ensureAuthenticated, (req, res) => {
  Idea.find({})
    .lean() // solve problems with displaying by default properties
    .sort({ date: "desc" })
    .then((ideas) => {
      res.render("ideas/index", {
        ideas,
      });
    });
});

routerIdeas.get("/add", ensureAuthenticated, (req, res) => {
  return res.render("ideas/add");
});

routerIdeas.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id,
  })
    .lean()
    .then((idea) => {
      res.render("ideas/edit", {
        idea,
      });
    });
});

routerIdeas.post("/", ensureAuthenticated, (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({ text: "Please add a title" });
  }
  if (!req.body.details) {
    errors.push({ text: "Please add some details" });
  }

  if (errors.length > 0) {
    res.render("ideas/add", {
      errors,
      title: req.body.title,
      details: req.body.details,
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details,
    };

    new Idea(newUser).save().then((idea) => {
      req.flash("success_msg", "Video idea added");
      res.redirect("/ideas");
    });
  }
});

routerIdeas.get("/", ensureAuthenticated, (req, res) => {
  return res.send("Welcome ideas");
});

// edit form process
routerIdeas.put("/:id", ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id,
  }).then((idea) => {
    // new values
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save().then((idea) => {
      req.flash("success_msg", "Video idea updated");
      res.redirect("/ideas");
    });
  });
});

routerIdeas.delete("/:id", ensureAuthenticated, (req, res) => {
  Idea.findByIdAndDelete({
    _id: req.params.id,
  }).then(() => {
    req.flash("success_msg", "Video idea removed");
    res.redirect("/ideas");
  });
});

module.exports = routerIdeas;
