//require user database
const User = require('../models/user');
const Restaurant = require('../models/restaurant');

//write a function that renders the registration form
function registrationNew(req,res) {
  res.render('registrations/new');
}

//write a function that creates the new user
function registrationCreate(req,res) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('success', `Thanks for registering, ${user.username}!`);
      req.session.userId =user._id;
      res.redirect('/restaurants/index');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

function registrationShow(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      Restaurant
        .find({createdBy: req.params.id})
        .exec()
        .then(restaurants => {
          res.render('registrations/show', { user, restaurants });
        });
    })
    .catch(next);

}

function registrationEdit(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      res.render('registrations/edit', {user});
    });

}

function registrationUpdate(req, res, next) {
  for(const field in req.body) {
    req.loggedInUser[field] = req.body[field];
  }

  req.loggedInUser.save()
    .then(() => res.redirect(`/profile/${req.loggedInUser.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/registrations/edit', err.toString());
      next(err);
    });
}

function registrationDelete(req, res, next) {
  return req.loggedInUser.remove()
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
