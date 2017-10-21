const User = require('../models/user');


function sessionNew(req, res) {
  res.render('sessions/new');
}

function sessionCreate(req, res) {
  User
    .create({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        res.status(401).render('sessions/new', { message: 'Unrecognised credentials' });
      }
      res.redirect('/');
    });
}

module.exports = {
  new: sessionNew,
  create: sessionCreate
};
