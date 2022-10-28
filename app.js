const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const routerMain = require("./routes/main");
const routerIdeas = require("./routes/ideas");
const routerUsers = require("./routes/users");
const path = require("path");
const passport = require("passport");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/vidjot-dev")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// middleware
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs.engine());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

// Express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// global varialbes
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
app.use("/", routerMain);
app.use("/ideas", routerIdeas);
app.use("/users", routerUsers);

// passport config
require("./config/passport")(passport);

const port = 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}...`);
});
