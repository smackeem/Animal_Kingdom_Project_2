const User = require("../models/users");
const Pet = require("../models/pet");
const Record = require("../models/record");

const bcrypt = require("bcryptjs");

module.exports = {
  create,
  login,
  show,
};

async function create(req, res, next) {
  const newUser = new User(req.body);
  newUser.address = req.body;
  console.log(newUser);
  try {
    await newUser.save();
    res.redirect("/user/login");
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
      res.render("users/login", { errMsg: "Invalid username" });
      return;
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      res.render("users/login", { errMsg: "Invalid password" });
      return;
    }

    res.redirect(`/user/${user._id}`);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send(error.message);
  }
}

async function show(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    const pets = await Pet.find({ owner: { _id: user._id } });
    const patients = await Pet.find({});
    const petRecords = await Record.find({}).populate('pet').find({'pet.owner': user._id}).exec();
    const vetRecords = await Record.find({vet: {_id: user._id}});
    console.log(vetRecords)
    res.render("users/show", { title: `${user.username} Profile`, user, pets, patients, petRecords, vetRecords});
  } catch (err) {
    console.log(err);
    res.redirect("/login");
  }
}
