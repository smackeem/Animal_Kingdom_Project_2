const User = require("../models/users");
const bcrypt = require("bcrypt"); // Add this line to import bcrypt

// Using an async named function for signup
async function signup(req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect("/login"); // Redirect to login page after successful signup
    return; // Return to stop further execution
  } catch (error) {
    res.status(500).send("Error saving user: " + error.message);
  }
}

// Using an async arrow function for login
async function login(req, res) {
  try {
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

    res.redirect("/"); // redirect to home page or another page if you wish
    return; // Return to stop further execution
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Export all controller functions at the end
module.exports = {
  signup,
  login,
};
