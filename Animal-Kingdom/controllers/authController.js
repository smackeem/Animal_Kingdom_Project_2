const User = require("../models/users");
const bcrypt = require("bcryptjs"); // Use bcryptjs if your model uses bcryptjs

async function signup(req, res) {
  try {
    const plainTextPassword = req.body.password; // Changed to a more standard field name

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      isAdmin: true, // Ensure this is intended for all signups
    });

    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    console.log(error); // Log the error for debugging
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

    // Check if the user is an admin and redirect accordingly
    if (user.isAdmin) {
      res.redirect("/admin-dashboard"); // Redirect to an admin-specific page
    } else {
      res.redirect("/"); // Redirect to the home page for regular users
    }
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
