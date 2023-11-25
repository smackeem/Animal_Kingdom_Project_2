const mongoose = require('mongoose');
const Schema = mongose.Schema;

const appointmentSchema = new Schema({
    vet: {type: Schema.Types.ObjectId, ref: 'User'},
    pet: {type: Schema.Types.ObjectId, ref: 'Pet'},
    date: Date,
    reason: String,
    isAvailable: Boolean,
},{
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);