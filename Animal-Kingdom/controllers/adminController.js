const User = require('../models/users');
const Pet = require('../models/pet');
const Record = require('../models/record');

module.exports = {
  dashboard,
};

async function dashboard(req, res, next) {
  try {
    console.log(req.params.id)
    const user = await User.findById(req.params.id);
    //const records = await Record.find({"vet": {_id: user._id}});
    res.render("users/admin-dashboard", {title: "Dashbboard", user});
  } catch (error) {
    console.error("Error rendering admin dashboard:", error);
    res.status(500).send(error.message);
  }
}
