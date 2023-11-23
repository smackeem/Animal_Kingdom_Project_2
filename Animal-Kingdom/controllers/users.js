const User = require('../models/users');
const Pet = require('../models/pet');
const Record = require('../models/record');

module.exports = {
    show
};

async function show(req, res, next){
    try{
        const user = await User.findById(req.params.id);
        const pets = await Pet.find({"owner": {_id: user._id}});
        res.render('users/owner-show', {title: `${user.username} Profile`, user, pets});
    }catch(err){
        console.log(err);
        res.redirect('/login');
    }
}