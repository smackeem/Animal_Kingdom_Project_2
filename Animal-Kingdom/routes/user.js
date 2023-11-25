//routes/user.js
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/users");

// Route to render the signup page
router.get("/signup", (req, res, next) => {
  res.render("users/signup", { errMsg: "" });
});

//router to render the login page
router.get("/login", (req, res, next) => {
  res.render("users/login", { errMsg: "" });
});

router.get("/logout", (req, res, next) => {
  res.clearCookie("nToken");
  return res.redirect("/");
});

//Route to handle user dashboard
router.get("/:id", userCtrl.show);

// Route to handle the signup form submission
router.post("/signup", userCtrl.create);

// Route to handle the login form submission
router.post("/login", userCtrl.login);

module.exports = router;
