const Record = require('../models/record');

module.exports = {
    new: newRecord,
    create,
};

function newRecord(req, res, next){
    res.render('records/new',{title: 'New Medical Record'});
}

async function create(req, res, next){
    req.body.diagnosis = req.body.diagnosis.trim();
    req.body.treatment = req.body.treatment.trim();
    req.body.medication = req.body.medication.trim();
    let record = await Record.create(req.body);
    try{
        record.pet = req.params.id;
        record.save();
        res.redirect('/records');
    }catch(err){
        console.log(err)
        res.redirect('/records');
    }
}