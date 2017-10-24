const Restaurant = require('../models/restaurant');
const User = require('../models/user');

function indexRoute(req, res, next) {
  Restaurant
    .find()
    .populate('createdBy')
    .exec()
    .then((restaurants) => {
      res.render('restaurants/index', { restaurants });
    })
    .catch(next);
}

function newRoute(req, res) {
  return res.render('restaurants/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;

  Restaurant
    .create(req.body)
    .then(restaurant => {
      User
        .findById(req.session.userId)
        .exec()
        .then(user => {
          user.restaurantsCreated.push(restaurant._id);
          user.save();
        })
        .then(() => res.redirect('/restaurants'));
    })
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/restaurants/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Restaurant
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((restaurant) => {
      if(!restaurant) return res.notFound();
      return res.render('restaurants/show', { restaurant });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Restaurant
    .findById(req.params.id)
    .exec()
    .then((restaurant) => {
      if(!restaurant) return res.redirect();
      if(!restaurant.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');
      return res.render('restaurants/edit', { restaurant });
    })
    .catch(next);
}


function updateRoute(req, res, next) {
  Restaurant
    .findById(req.params.id)
    .exec()
    .then(restaurant => {
      console.log('req params', req.params.id);
      console.log('This is the restaurant:', restaurant);
      if(!restaurant) return res.notFound();
      if(!restaurant.belongsTo(req.user)) return res.unauthorized('You do not have permission to edit that resource');

      for(const field in req.body) {
        restaurant[field] = req.body[field];
      }

      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/restaurants/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Restaurant
    .findById(req.params.id)
    .exec()
    .then((restaurant) => {
      if(!restaurant) return res.notFound();
      if(!restaurant.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      return restaurant.remove();
    })
    .then(() => res.redirect('/restaurants'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  Restaurant
    .findById(req.params.id)
    .exec()
    .then((restaurant) => {
      if (!restaurant) return res.notFound();

      req.body.createdBy = req.user;
      restaurant.comments.push(req.body);

      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/restaurants/${req.params.id}`, err.toString());
      next(err);
    });
}

// function deleteCommentRoute(req, res, next) {
//   Restaurant
//     .findById(req.params.id)
//     .exec()
//     .then((restaurant) => {
//       if (!restaurant) return res.notFound();
//       if (!restaurant.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
//       restaurant.comments.id(req.params.comment._id).remove();
//
//       return restaurant.save();
//     })
//     .then(restaurant => res.redirect(`/restaurants/${restaurant.id}`))
//     .catch(next);
// }
function deleteCommentRoute(req, res, next) {
  Restaurant
    .findById(req.params.id)
    .exec()
    .then((restaurant) => {
      if (!restaurant) return res.notFound();
      if (!restaurant.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');

      const comment = restaurant.comments.id(req.params.commentId);
      comment.remove();

      return restaurant.save();
    })
    .then(restaurant => res.redirect(`/restaurants/${restaurant.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
