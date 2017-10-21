//require user database
const User = require('../models/user');

//write a function that renders the registration form
function registrationNew(req,res) {
  res.render('registration/new');
}

//write a function that creates the new user
function registrationCreate(req,res,next) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}!`);
      req.session.userId =user._id;
      res.redirect('/');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

//export them
module.exports = {
  new: registrationNew,
  create: registrationCreate
};
