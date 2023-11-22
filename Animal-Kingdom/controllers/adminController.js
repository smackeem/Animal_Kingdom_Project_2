const adminController = {
  // function to render admin dashboard
  dashboard: async (req, res) => {
    console.log("Admin Dashboard Function Called");

    // Log details from req.user if available (assuming req.user is set after login)
    console.log("Current User:", req.user);

    try {
      // render admin dashboard view
      console.log("Rendering admin dashboard");
      res.render("users/admin-dashboard");
    } catch (error) {
      console.error("Error rendering admin dashboard:", error);
      res.status(500).send(error.message);
    }
  },
};


// you can add other admin-related functions here

module.exports = adminController;
