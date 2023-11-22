const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const methodOverride = require("method-override");
require("dotenv").config();
require("./config/database");

const indexRouter = require("./routes/index");
const recordsRouter = require("./routes/records");
const petRouter = require("./routes/pet");
const authRoutes = require("./routes/auth"); // Import auth routes
const adminRoutes = require("./routes/admin"); // Import admin routes

const app = express();

// Test route
app.get("/test", (req, res) => res.send("Test route is working"));

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
app.use("/auth", authRoutes); // Use auth routes
app.use("/pet", petRouter);
app.use("/admin", adminRoutes); // Use admin routes

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
