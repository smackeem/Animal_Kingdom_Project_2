// models/appointments.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    pet: { type: Schema.Types.ObjectId, ref: "Pet" },
    vet: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
    reason: String,
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
