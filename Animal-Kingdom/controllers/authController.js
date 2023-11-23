const User = require("../models/users");
const bcrypt = require("bcryptjs");

// Using an async function for signup
async function signup(req, res) {
  try {
    const newUser = new User(req.body); // Directly use req.body

    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).send("Error saving user: " + error.message);
  }
}

// Using an async function for login
async function login(req, res) {
  try {
    console.log("Attempting login with:", req.body.username);

    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      res.status(401).send("Invalid username");
      return;
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(401).send("Invalid password");
      return;
    }

    if (user.isAdmin) {
      res.redirect("/admin/dashboard");
    } else {
      res.redirect(`/user/${user._id}`);
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  signup,
  login,
};
