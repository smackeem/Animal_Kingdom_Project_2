// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route to render the signup page
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

//router to render the login page
router.get("/login", (req, res) => {
  res.render("users/login");
});

// Route to handle the signup form submission
router.post("/signup", authController.signup);

module.exports = router;
