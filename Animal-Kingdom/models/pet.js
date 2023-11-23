const mongoose = require('mongoose')
const Schema = mongoose.Schema

const petSchema = new Schema(
	{
		owner: { type: Schema.Types.ObjectId, ref: 'User' },
		name: { type: String, required: true },
		species: {type: String, enum: ['Bird', 'Cat', 'Dog', 'Fish', 'Guinea Pig', 'Hamster', 'Lizard', 'Rabbit', 'Snake', 'Turtle'], required: true},
		breed: String,
		age: Number,
		DOB: Date,
		photo: String
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Pet', petSchema)
