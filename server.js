// server.js is the entry point for the application. It is responsible for requiring the necessary packages, setting up the database, and starting the server.
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//method override
const methodOverride = require("method-override");

//Database config
require("dotenv").config();
console.log("Database URL:", process.env.DATABASE_URL); //debugging

require("./config/database");

//Routes
const indexRouter = require("./routes/index");
const recordsRouter = require("./routes/records");
const petRouter = require("./routes/pet");
const userRouter = require("./routes/user");
const appointmentRouter = require("./routes/appointment");
const accountRouter = require("./routes/account"); //account routes

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use("/", indexRouter);
app.use("/", recordsRouter);
app.use("/", petRouter);
app.use("/", appointmentRouter);
app.use("/", accountRouter); //account routes

app.use("/user", userRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
