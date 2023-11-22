//controllers/adminController.js
const adminController = {
  // function to render admin dashboard
  dashboard: async (req, res) => {
    try {
      // render admin dashboard view
      // pass addional data if needed?
      res.render("users/admin-dashboard");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

// you can add other admin-related functions here

module.exports = adminController;
