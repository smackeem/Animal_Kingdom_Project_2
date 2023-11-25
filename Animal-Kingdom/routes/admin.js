const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  console.log("isAdmin Middleware Called");

  // Logging to check if req.user exists and if it has the isAdmin property
  console.log("req.user:", req.user);
  console.log("Is Admin:", req.user && req.user.isAdmin);

  if (req.user && req.user.isAdmin) {
    console.log("User is admin, proceeding to dashboard");
    return next();
  }

  console.log("User is not admin, redirecting to login");
  res.redirect("/login"); // or a not authorized page
};

// Routes for admin functionality
router.get("/dashboard", adminController.dashboard);

module.exports = router;
