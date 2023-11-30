// controllers/account.js
const User = require("../models/users");

module.exports = {
  getAccount,
  updateAccount,
};

async function getAccount(req, res) {
  try {
    const user = await User.findById(req.params.id).populate("address");
    res.render("users/account", { user });
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${req.params.id}`);
  }
}

async function updateAccount(req, res) {
  req.body.firstName = req.body.firstName.trim();
  req.body.lastName = req.body.lastName.trim();
  req.body.email = req.body.email.trim();
  req.body.username = req.body.username.trim();
  req.body.phone = req.body.phone.trim();
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    user.address = req.body;
    await user.save();
    res.redirect(`/user/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${req.params.id}`);
  }
}
