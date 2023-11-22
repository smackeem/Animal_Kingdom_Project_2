const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		name: { type: String, required: true },
		species: String,
		breed: String,
		DOB: Date,
		//photo?
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Pet', petSchema)
