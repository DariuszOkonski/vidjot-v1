const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/vidjot-dev")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

require("./models/Idea");
const Idea = mongoose.model("ideas");

//View engine setup
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

app.get("/", (req, res) => {
  const title = "Welcome";
  return res.render("index", {
    title,
  });
});

app.get("/about", (req, res) => {
  return res.render("about");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
