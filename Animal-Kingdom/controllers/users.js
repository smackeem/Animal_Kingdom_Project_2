// controller/user.js
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Pet = require("../models/pet");
const Record = require("../models/record");
const Appointment = require("../models/appointment");
const today = new Date();
const bcrypt = require("bcryptjs");

module.exports = {
  create,
  login,
  show,
};

async function create(req, res) {
  const newUser = new User(req.body);
  newUser.address = req.body; // Corrected address assignment
  console.log(newUser);
  try {
    await newUser
      .save()
      .then((newUser) => {
        const token = jwt.sign({ _id: newUser._id }, process.env.SECRET, {
          expiresIn: "60 days",
        });
        res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
        return;
      })
      .catch((error) => {
        console.log(error); // Log the error for debugging
        res.status(500).send("Error saving user: " + error.message);
      });
    res.redirect("/user/login");
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).send("Error saving user: " + error.message);
  }
}

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

    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
      expiresIn: "60 days",
    });
    res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
    res.redirect(`/user/${user._id}`);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send(error.message);
  }
}

async function show(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    const pets = await Pet.find({ owner: { _id: user._id } }).populate("owner");
    const vetRecords = await Record.find({ vet: { _id: user._id } }).populate(
      "pet"
    );
    const allPatients = vetRecords.map((record) => record.pet);
    const patients = mergeDuplicates(allPatients, ["_id"]);
    const petAppointments = await Appointment.find({
      pet: { $in: pets },
      date: { $gte: today },
    })
      .populate("pet")
      .populate("vet")
      .sort({ date: 1 });
    const vetAppointments = await Appointment.find({
      vet: req.params.id,
      isAvailable: false,
      date: { $gte: today },
    })
      .populate("pet")
      .sort({ date: 1 });
    res.render("users/show", {
      title: `${user.username} Profile`,
      user,
      pets,
      vetRecords,
      patients,
      petAppointments,
      vetAppointments,
    });
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${req.params.userId}`);
  }
}

function mergeDuplicates(arr, key) {
  const uniqueMap = new Map();

  // Iterate through the array
  arr.forEach((item) => {
    // Generate a unique identifier based on the specified key(s)
    const identifier = key.map((k) => item[k]).join("|");

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
