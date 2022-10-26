const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/vidjot-dev")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

require("./models/Idea");
const Idea = mongoose.model("ideas");

// middleware
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.get("/", (req, res) => {
  const title = "Welcome";
  return res.render("index", {
    title,
  });
});

app.get("/about", (req, res) => {
  return res.render("about");
});

app.get("/ideas/add", (req, res) => {
  return res.render("ideas/add");
});

app.post("/ideas", (req, res) => {
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

app.get("/ideas", (req, res) => {
  return res.send("Welcome ideas");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
