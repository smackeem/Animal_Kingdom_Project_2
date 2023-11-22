const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petSchema = new Schema(
	{
		name: { type: String, required: true },
		species: { type: String },
		breed: { type: String },
		DOB: { type: Date },
		//photo?
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Pet', petSchema)
