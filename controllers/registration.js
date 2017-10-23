//require user database
const User = require('../models/user');

//write a function that renders the registration form
function registrationNew(req,res) {
  res.render('registrations/new');
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

function registrationShow(req, res) {
  return res.render('registrations/show');
}

function registrationEdit(req, res) {
  return res.render('registrations/edit');
}

function registrationUpdate(req, res, next) {
  for(const field in req.body) {
    req.user[field] = req.body[field];
  }

  req.user.save()
    .then(() => res.redirect('/profile'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/registrations/edit', err.toString());
      next(err);
    });
}

function registrationDelete(req, res, next) {
  return req.user.remove()
    .then(() => {
      req.session.regenerate(() => res.redirect('/'));
    })
    .catch(next);
}

//export them
module.exports = {
  new: registrationNew,
  create: registrationCreate,
  show: registrationShow,
  edit: registrationEdit,
  update: registrationUpdate,
  delete: registrationDelete
};
