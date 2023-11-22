const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//method override
const methodOverride = require("method-override");

//Database config
require("dotenv").config();
require("./config/database");

//Routes
const authRoutes = require("./routes/auth");
const indexRouter = require("./routes/index");
const recordsRouter = require("./routes/records");
const petRouter = require('./routes/pet')

const app = express();

//test route
app.get("/test", (req, res) => res.send("Test route is working"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app.use("/auth", authRoutes);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use("/", indexRouter);
//app.use("/users", usersRouter);
app.use("/auth", authRoutes);
app.use("/", recordsRouter);
app.use('/pet', petRouter);

//login route
//app.get("/login", (req, res) => res.redirect("/auth/login"));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
