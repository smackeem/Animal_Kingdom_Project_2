const Record = require('../models/record');

module.exports = {
    new: newRecord,
    create,
    index,
    delete: deleteRecord,
    show
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

async function index(req, res, next){
    try{
        const records = await Record.find({});
        res.render('records/index', {title: "All Medical Records", records});
    }catch(err){
        console.log(err);
        res.redirect('/');
    }
}

async function deleteRecord(req, res, next){
    try{
        await Record.findByIdAndDelete(req.params.id);
        res.redirect('/records');
    }catch(err){
        console.log(err);
    }
}

async function show(req, res, next){
    try{
        const record = await Record.findById(req.params.id);
        res.render('records/show',{title: 'Pet medical record', record});
    }catch(err){
        console.log(er)
    }
}