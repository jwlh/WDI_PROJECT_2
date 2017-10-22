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
    username: 'jonnyhall',
    email: 'jonny@jonny.com',
    password: 'password',
    passwordConfirmation: 'password'
  } ,
  {
    firstName: 'Louise',
    lastName: 'Hall',
    username: 'louisehall',
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
        createdBy: users[0]
      },{
        name: 'Homeslice Pizza Shoreditch',
        address: {
          line1: '374-378 Old Street',
          city: 'London',
          postcode: 'EC1V 9LT'

        },
        image: 'https://static1.squarespace.com/static/558d04b2e4b0750606e349c9/55a226d6e4b0417147b993be/55d4375ce4b05b3ce743c477/1439971166177/_MG_5077.jpg?format=1000w',
        rating: 5,
        createdBy: users[0]
      }]);
  })
  .then((restaurants) => console.log(`${restaurants.length} restaurants created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
