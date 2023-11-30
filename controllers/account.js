// controllers/account.js
const User = require("../models/user");

module.exports = {
  getAccount,
  update,
};

async function getAccount(reg, res) {
  try {
    const user = await User.findById(req.user._id);
    res.render("account", { user });
  } catch (err) {
    console.log(err);
    res.redirect("/account");
  }
}

async function updateAccount(req, res) {
  try {
    const user = await User.findById(req.user._id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.username = req.body.username;
    user.phone = req.body.phone;
    await user.save();
    res.redirect("/account");
  } catch (err) {
    console.log(err);
    res.redirect("/account");
  }
}
