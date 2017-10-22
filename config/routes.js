const express = require('express');
const router  = express.Router();
const registration = require('../controllers/registration');
const session = require('../controllers/session');
const restaurantsController = require('../controllers/restaurants');
const secureRoute = require('../lib/secureRoute');
// A home route
router.get('/', (req, res) => res.render('homepage'));


router.route('/register')
  .get(registration.new)
  .post(registration.create);

router.route('/login')
  .get(session.new)
  .post(session.create);

router.route('/logout')
  .get(session.delete);


router.route('/restaurants')
  .get(restaurantsController.index)
  .post(secureRoute, restaurantsController.create);

router.route('/restaurants/new')
  .get(secureRoute, restaurantsController.new);

router.route('/restaurants/:id')
  .get(restaurantsController.show)
  .put(secureRoute, restaurantsController.update)
  .delete(secureRoute, restaurantsController.delete);

router.route('/restaurants/:id/edit')
  .get(secureRoute, restaurantsController.edit);

router.route('/restaurants/:id/comments')
  .post(secureRoute, restaurantsController.createComment)
  .delete(secureRoute, restaurantsController.deleteComment);



router.all('*', (req, res) => res.notFound());

module.exports = router;
