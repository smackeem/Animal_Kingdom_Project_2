const jwt = require('jsonwebtoken');
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
    await newUser.save().then((newUser) => {
      const token = jwt.sign({_id: newUser._id}, process.env.SECRET, {expiresIn: '60 days'});
      res.cookie('nToken', token, {maxAge: 900000, httpOnly: true});
      return res.redirect('/user/login');
    }).catch ((error) => {
      console.log(error); // Log the error for debugging
      res.status(500).send("Error saving user: " + error.message);
    })
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
    const pets = await Pet.find({ owner: { _id: user._id } }).populate('owner');
    const vetRecords = await Record.find({vet: {_id: user._id}}).populate('pet');
    const allPatients = vetRecords.map((record) => record.pet);
    const patients = mergeDuplicates(allPatients, ['_id']);
    res.render("users/show", { title: `${user.username} Profile`, user, pets, vetRecords, patients});
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${req.params.id}`);
  }
}

function mergeDuplicates(arr, key) {
  const uniqueMap = new Map();

  // Iterate through the array
  arr.forEach(item => {
    // Generate a unique identifier based on the specified key(s)
    const identifier = key.map((k) => item[k]).join('|');

    // Check if the identifier is already in the map
    if (uniqueMap.has(identifier)) {
      // Merge the current item with the existing item in the map
      Object.assign(uniqueMap.get(identifier), item);
    } else {
      // If not, add the item to the map
      uniqueMap.set(identifier, { ...item });
    }
  });

  // Convert the Map values back to an array
  const mergedArray = Array.from(uniqueMap.values());
  return mergedArray;
}