const express = require('express');
const router  = express.Router();
const registrations = require('../controllers/registration');
const session = require('../controllers/session');
const restaurants = require('../controllers/restaurants');
const secureRoute = require('../lib/secureRoutes');
// A home route
router.get('/', (req, res) => res.render('homepage'));


router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/profile')
  .get(registrations.show)
  .put(registrations.update)
  .delete(registrations.delete);

router.route('/profile/edit')
  .get(registrations.edit);

router.route('/login')
  .get(session.new)
  .post(session.create);

router.route('/logout')
  .get(session.delete);


router.route('/restaurants')
  .get(restaurants.index)
  .post(secureRoute, restaurants.create);

router.route('/restaurants/new')
  .get(secureRoute, restaurants.new);

router.route('/restaurants/:id')
  .get(restaurants.show)
  .put(secureRoute, restaurants.update)
  .delete(secureRoute, restaurants.delete);

router.route('/restaurants/:id/edit')
  .get(secureRoute, restaurants.edit);

router.route('/restaurants/:id/comments')
  .post(secureRoute, restaurants.createComment)
  .delete(secureRoute, restaurants.deleteComment);

// router.route('/hotels/:id/comments/:commentId')
//   .delete(restaurants.deleteComment);



router.all('*', (req, res) => res.notFound());

module.exports = router;
