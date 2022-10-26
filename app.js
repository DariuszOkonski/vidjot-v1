const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

//View engine setup
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

app.get("/", (req, res) => {
  const title = "Welcome, my friend";
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
