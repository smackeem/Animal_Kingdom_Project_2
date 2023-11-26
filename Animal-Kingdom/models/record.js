//models/record.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    pet: { type: Schema.Types.ObjectId, ref: "Pet" },
    vet: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, required: true },
    diagnosis: String,
    treatment: String,
    medication: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Record", recordSchema);
