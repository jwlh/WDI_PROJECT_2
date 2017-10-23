const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });


// Require the model
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
// Drop the model
User.collection.drop();
Restaurant.collection.drop();
// Create the models
User
  .create([{
    firstName: 'Jonny',
    lastName: 'Hall',
    username: 'jonny',
    email: 'jonny@jonny.com',
    password: 'password',
    passwordConfirmation: 'password'
  } ,
  {
    firstName: 'Louise',
    lastName: 'Hall',
    username: 'louise',
    email: 'louise@louise.com',
    password: 'password',
    passwordConfirmation: 'password'
  }, {
    firstName: 'Ralph',
    lastName: 'Hall',
    username: 'ralph',
    email: 'louise@louise.com',
    password: 'password',
    passwordConfirmation: 'password'

  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Restaurant
      .create([{
        name: 'L’Antica Pizzeria da Michele',
        address: {
          line1: '125 Stoke Newington Church Street',
          city: 'London',
          postcode: 'N16 0UH'
        },
        image: 'http://3rl6883b15pn3lu5qr1bbnzv14uh.wpengine.netdna-cdn.com/wp-content/uploads/2017/02/pizzeria-da-michele-stoke-newington-exterior.jpg',
        rating: 5,
        review: 'L’Antica Pizzeria Da Michele is a small spot on Stokey Church Street that feels like a proper locals-only establishment, with just a few tables, minimal decor, and a gigantic pizza oven out back that’s been shipped brick-by-brick from Italy. There are only two pizzas on the menu, so if you’re looking for prosciutto or spicy chorizo or fucking hoisin duck on your pizza like some cretin, then you should probably just go to Domino’s and then banish yourself from the internet. Da Michele doesn’t play like that.  What they do play is a skilled game of simplicity. The margherita here is absolutely incredible, and the marinara might be even better. Both rely on the sheer quality of the sauce and crust to shine, but the marinara, in particular, has a brightness and clarity of flavor that makes every tomato sauce you’ve had on pizza up until this point seem like pure garbage.',
        createdBy: users[0]
      }, {
        name: 'Pizza East',
        address: {
          line1: '56 Shoreditch High Street',
          city: 'London',
          postcode: 'E1 6JJ'
        },
        image: 'http://londoneater.com/wp-content/uploads/2010/05/Pizza-East-23.jpg',
        rating: 5,
        review: 'Pizza East is one of the best casual spots in Shoreditch for an easy dinner with a few friends. The pizzas are always good, and there’s things other than pizza on the menu, from antipasti to pasta to grilled meat and fish, to keep everyone happy. Yes, even your colleague who insists on eating a spoonful of peanut butter every hour because he wants to “stay in ketosis.” Whatever that means. The crowd’s always up for a good time in the evenings, and as a bonus for your perpetually broke friends, a meal here’s usually wallet-friendly.',
        createdBy: users[0]
      },{
        name: 'Homeslice Pizza Shoreditch',
        address: {
          line1: '374-378 Old Street',
          city: 'London',
          postcode: 'EC1V 9LT'

        },
        image: 'https://static1.squarespace.com/static/558d04b2e4b0750606e349c9/55a226d6e4b0417147b993be/55d4375ce4b05b3ce743c477/1439971166177/_MG_5077.jpg?format=1000w',
        rating: 4,
        review: 'Your difficult friend Becks is visiting from Earlsfield, but you want to be sure to get a good meal while avoiding an evening of bitching and moaning about ‘challenging’ ethnic food and small portions. Take them to Homeslice, a Valhalla for anyone who loves pizza, and let the sweet taste of red sauce and mozzarella wash over you like that one time you went to The Berkeley and got a neck massage. The pizzas are pricey but they’re huge, and you can get them by the slice if you’re indecisive or not super hungry. The drinks list is short and sweet, but they have prosecco on tap, which makes up for it.',
        createdBy: users[1]
      }]);
  })
  .then((restaurants) => console.log(`${restaurants.length} restaurants created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
