const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
<<<<<<< HEAD
//const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

// initialize dotenv
require("dotenv").config();

// import mongoose library
require("./config/database");
=======

const methodOverride = require('method-override');
require('dotenv').config();
require('./config/database');
>>>>>>> 01cf6268a87bf29254f8e161ff006b5bf8cbde76

const indexRouter = require("./routes/index");
const recordsRouter = require("./routes/records");

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
app.use(methodOverride('_method'));

app.use("/", indexRouter);
<<<<<<< HEAD
app.use("/users", usersRouter);
app.use("/auth", authRoutes);

//login route
app.get("/login", (req, res) => res.redirect("/auth/login"));

// // connect to mongoose
// mongoose
//   .connect("mongodb://localhost:27017/yourDatabaseName", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch((err) => console.error("Could not connect to MongoDB...", err));
=======
app.use("/records", recordsRouter);
>>>>>>> 01cf6268a87bf29254f8e161ff006b5bf8cbde76

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// //error handling
// app.use((req, res, next) => {
//   next(new NotFoundError("Not Found")); // Or similar error handling
// });

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
