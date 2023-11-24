// models/users.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const addressSchema = new Schema ({
  streetAddress: String,
  city: String,
  state: String,
  zip: String
}, {
  timestamps: true
});

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: addressSchema,
  phone: String,
  userType: String,
  isAdmin: { type: Boolean, default: false }, //admin field added here
});

// Hash the user's password before saving to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
