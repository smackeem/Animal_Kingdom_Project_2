// models/users.js
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: String,
  phone: String,
});
