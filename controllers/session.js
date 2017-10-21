const User = require('../models/user');


function sessionNew(req, res) {
  res.render('session/new');
}

function sessionCreate(req, res) {
  User
    .create({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        res.status(401).render('session/new', { message: 'Unrecognised credentials' });
      }

      req.session.userId = user.id;

      res.redirect('/');
    });
}

module.exports = {
  new: sessionNew,
  create: sessionCreate
};
