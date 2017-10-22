const express = require('express');
const router  = express.Router();
const registration = require('../controllers/registration');
const session = require('../controllers/session');
const restaurantsController = require('../controllers/restaurants');

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
  .post(restaurantsController.create);

router.route('/restaurants/new')
  .get(restaurantsController.new);

router.route('/restaurants/:id')
  .get(restaurantsController.show)
  .put(restaurantsController.update)
  .delete(restaurantsController.delete);

router.route('/restaurants/:id/edit')
  .get(restaurantsController.edit);

router.route('/restaurants/:id/comments')
  .post(restaurantsController.createComment)
  .delete(restaurantsController.deleteComment);



router.all('*', (req, res) => res.notFound());

module.exports = router;
