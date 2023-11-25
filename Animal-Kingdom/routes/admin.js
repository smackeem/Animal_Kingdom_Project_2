// routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.redirect("login"); // or a not authorized page
};

// Routes for admin functionality
router.get("/dashboard", isAdmin, adminController.dashboard);

module.exports = router;
