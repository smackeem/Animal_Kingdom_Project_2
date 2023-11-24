const User = require("../models/users");
const bcrypt = require("bcryptjs");

module.exports = {
  signup,
  login,
};

// Using an async function for signup
async function signup(req, res) {
  const newUser = new User(req.body);
  newUser.address = req.body
  console.log(newUser)
  try {
    await newUser.save();
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).send("Error saving user: " + error.message);
  }
}

// Using an async function for login
async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      res.render('users/login', {errMsg: "Invalid username"});
      return;
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.render('users/login', {errMsg: "Invalid password"});
      return;
    }

    res.redirect(`/user/${user._id}`);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send(error.message);
  }
}

//Discarded code
  /*   if(user.isAdmin){
      res.redirect("/admin/dashboard");
    }else{
      res.redirect(`/user/${user._id}`);
    } */
    /* if (user.userType === "Veterinarian") {
      res.redirect("/admin/dashboard");
    }
    if(user.userType === "Owner"){
      res.redirect(`/user/${user._id}`);
    } */