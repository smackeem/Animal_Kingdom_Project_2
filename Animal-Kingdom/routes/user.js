//routes/user.js
const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/users");

router.get("/signup", (req, res, next) => {
  res.render("users/signup", { errMsg: "" });
});

router.get("/login", (req, res, next) => {
  res.render("users/login", { errMsg: "" });
});

router.get("/logout", (req, res, next) => {
  res.clearCookie("nToken");
  return res.redirect("/");
});

router.get("/:id", userCtrl.show);

router.post("/signup", userCtrl.create);

router.post("/login", userCtrl.login);

module.exports = router;
