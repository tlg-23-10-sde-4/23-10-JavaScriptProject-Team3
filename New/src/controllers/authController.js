const authController = {
  // Render the login page
  login: (req, res) => {
    res.render('login', { /* Additional data if needed */ });
  },

  // Handle user logout
  logout: (req, res) => {
    try {
      req.logout();
      res.redirect('/');
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = authController;
