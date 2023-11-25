const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    vet: {type: Schema.Types.ObjectId, ref: 'User'},
    pet: {type: Schema.Types.ObjectId, ref: 'Pet'},
    date: Date,
    reason: String,
    isAvailable: {type: Boolean, default: false}
},{
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);