const Appointment = require('../models/appointment');
const Record = require('../models/record');
const Pet = require('../models/pet');
const User = require('../models/users');

module.exports = {
    new: newAppt,
}

async function newAppt(req, res, next){
    try{
        const user = await User.findById(req.params.id);
        res.render('records/new',{title: 'New Medical Record', errMsg: '', user});
    }catch(err){
        console.log(err);
    }
}

