const User = require('../models/user');

function authentication(req, res, next) {
  if(!req.session.isAuthenticated) return next();

  User
    .findById(req.session.userId)
    .then((user) => {
      if(!user) {
        return req.session.regenerate(() => {
          req.flash('danger', 'You must be logged in');
          return res.redirect('/login');
        });
      }

      req.session.userId = user._id;

      res.locals.loggedInUser = user;
      res.locals.isAuthenticated = true;

      req.loggedInUser = user;

      next();
    });


}

module.exports = authentication;
