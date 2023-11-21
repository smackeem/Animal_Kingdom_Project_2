// controllers/authController.js

const User = require("../models/users");

// Using an async named function
async function signup(req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect("/login"); // Redirect to login page after successful signup
  } catch (error) {
    res.status(500).send("Error saving user: " + error.message);
  }
}

// Export all controller functions at the end
module.exports = {
  signup,
};
