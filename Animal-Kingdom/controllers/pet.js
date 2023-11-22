const Pet = require('../models/pet')

module.exports = {
    index,
    new: newPet,
    create,
    show,
    delete: deletePet,
}

async function index(req, res) {
    try {
        const pets = await Pet.find({})
        res.render('pets/index', { title: 'My Pets'}, pets)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

function newPet(req, res) {
    res.render('pets/new', { title: 'New Pet'})
}

async function create(req, res) {
    req.body.name = req.body.name.trim()
    req.body.species = req.body.species.trim()
    req.body.breed = req.body.breed.trim()
    let pet = await Pet.create(req.body)
    try {
        pet.owner = req.params.id
        pet.save()
        res.redirect('/pets')
    } catch (err) {
        console.log(err)
        res.redirect('/pets')
    }
}

async function show(req, res) {
    try {
        const pet = await Pet.findById(req.params.id)
        res.render('pets/show', {title: 'Pet Profile'}, pet)
    } catch (err) {
        console.log(err)
        res.redirect('/pets')
    }
}

async function deletePet(req, res) {
    try {
        await Pet.findByIdAndDelete(req.params.id)
        res.redirect('/pets')
    } catch (err) {
        console.log(err)
        res.redirect('/pets')
    }
}