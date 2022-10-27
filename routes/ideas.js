const express = require("express");
const mongoose = require("mongoose");

const routerIdeas = express.Router();

require("../models/Idea");
const Idea = mongoose.model("ideas");

routerIdeas.get("/", (req, res) => {
  Idea.find({})
    .lean() // solve problems with displaying by default properties
    .sort({ date: "desc" })
    .then((ideas) => {
      res.render("ideas/index", {
        ideas,
      });
    });
});

routerIdeas.get("/add", (req, res) => {
  return res.render("ideas/add");
});

routerIdeas.get("/edit/:id", (req, res) => {
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

routerIdeas.post("/", (req, res) => {
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
      res.redirect("/ideas");
    });
  }
});

routerIdeas.get("/", (req, res) => {
  return res.send("Welcome ideas");
});

// edit form process
routerIdeas.put("/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id,
  }).then((idea) => {
    // new values
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save().then((idea) => {
      res.redirect("/ideas");
    });
  });
});

routerIdeas.delete("/:id", (req, res) => {
  Idea.findByIdAndDelete({
    _id: req.params.id,
  }).then(() => {
    res.redirect("/ideas");
  });
});

module.exports = routerIdeas;
