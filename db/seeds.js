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
        name: 'Radio Alice',
        address: {
          line1: '16 Hoxton Square',
          city: 'London',
          postcode: 'N1 6NT'
        },
        image: 'http://crummbs.co.uk/wp-content/uploads/2017/03/Radio-Alice-Pizza-940x627.jpg',
        rating: 1,
        review: 'Every new restaurant nowdays appears to need a “concept” associated with it. The concept at Radio Alice, the pizzeria, is that they don’t know how to make pizza.  Of course, Radio Alice would tell you otherwise - their “concept” is that they cook the pizza base BEFORE putting on the toppings like some sort of madman.  They also seem ot have skillfully removed any taste from their tomato sauce. And finally they seem to quite often run out of dough being turned away from a pizza place because they ran out of pizza dough is a new low.  Pizza isn\'t hard put everything together, shove it in that fancy oven, and give the people what they want. There’s a concept for you.',
        createdBy: users[2]
      }, {
        name: 'Yard Sale Clapton',
        address: {
          line1: '105 Lower Clapton Rd',
          city: 'London',
          postcode: 'E5 0NP'
        },
        image: 'http://www.hot-dinners.com/images/stories/blog/2014/yardsale.jpg',
        rating: 4,
        review: 'Yard Sale\'s branch on Clapton road is small, you won\'t be dining in here really but hit it up for takeaway and get yourself a cheesy marmite garlic bread, it might sound wrong but it tastes sooooo good.  They have a few favourites on all the time and then a list of changing specials, some of which can be a little out there and in this reviewers mind just plain wrong for a pizza, moroccan lamb pizza anyone????  However the pizzas are always great and also come in a huge 18" if required (always required).',
        createdBy: users[0]
      }, {
        name: 'Pizza East',
        address: {
          line1: '56 Shoreditch High Street',
          city: 'London',
          postcode: 'E1 6JJ'
        },
        image: 'http://londoneater.com/wp-content/uploads/2010/05/Pizza-East-23.jpg',
        rating: 4,
        review: 'Pizza East is a good place for an easy dinner with a few friends. The pizzas are always good, and there’s things other than pizza on the menu, apparently there are some people who want to eat things other than pizza (although why you classify them as "friends" and are eating with them I have no idea).  As a bonus for your perpetually broke friends, a meal here’s usually pretty wallet-friendly.',
        createdBy: users[1]
      },{
        name: 'Homeslice Pizza Shoreditch',
        address: {
          line1: '374-378 Old Street',
          city: 'London',
          postcode: 'EC1V 9LT'

        },
        image: 'https://static1.squarespace.com/static/558d04b2e4b0750606e349c9/55a226d6e4b0417147b993be/55d4375ce4b05b3ce743c477/1439971166177/_MG_5077.jpg?format=1000w',
        rating: 4,
        review: 'Your difficult friend Becks is visiting from Earlsfield, but you want to be sure to get a good meal while avoiding an evening of bitching and moaning about ‘challenging’ ethnic food and small portions. Take them to Homeslice, a Valhalla for anyone who loves pizza, and let the sweet taste of red sauce and mozzarella wash over you like that one time you went to The Berkeley and got a neck massage. The pizzas are pricey but they’re huge, and you can get them by the slice if you’re indecisive or not super hungry. The drinks list is short but as it includes prosecco on tapyou don\'t need any other options anyway.',
        createdBy: users[1]
      }]);
  })
  .then((restaurants) => console.log(`${restaurants.length} restaurants created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
