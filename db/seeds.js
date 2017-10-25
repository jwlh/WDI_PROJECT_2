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
    email: 'ralph@ralph.com',
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
        image: 'https://d37219swed47g7.cloudfront.net/media/CACHE/images/images/reviews/lantica-pizzeria-da-michele/KarolinaWiercigroch_L%27AnticaPizzeriaDaMichele_group1/fedd2c53f5dc932ba54d016fcc365107.jpg',
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
        image: 'https://media.timeout.com/images/103729177/image.jpg',
        rating: 4,
        review: 'Pizza East is a good place for an easy dinner with a few friends. The pizzas are always good, and there’s things other than pizza on the menu, apparently there are some people who want to eat things other than pizza (although why you classify them as "friends" and are eating with them I have no idea).  As a bonus for your perpetually broke friends, a meal here’s usually pretty wallet-friendly.',
        createdBy: users[1]
      }, {
        name: 'Franco Manca Fitzrovia',
        address: {
          line1: '98 Tottenham Court Road',
          city: 'London',
          postcode: 'W1T 4TR'
        },
        image: 'https://farm2.staticflickr.com/1617/25820412891_21cfe3c9f4_c.jpg',
        rating: 4,
        review: 'Here you can sate a craving for genuine, Neapolitan-style pizza, with a flavourful slow-rise sourdough crust and a variety of traditional and innovative toppings. Purists will prefer either the tomato, garlic and oregano or the tomato, mozzarella and basil, in season. The tasty chorizo pizza comes in two versions (thick-cut and thin-cut, dried) of the rich, oily Spanish sausage; it’s reminiscent of New York’s ubiquitous pepperoni pizza. Other menu choices and daily specials include a variety of seasonal vegetable and cured meat-laden pizzas that, while of top-quality, we find a little busy. Side salads and the restaurant’s unusual lemonade (murky brown and slightly like an Arnold Palmer, thanks to a tannic under-taste) are highly recommended',
        createdBy: users[2]
      }, {
        name: 'Sodo Pizza Cafe Clapton',
        address: {
          line1: '126 Upper Clapton Rd ',
          city: 'London',
          postcode: 'E5 9JY'
        },
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/0a/68/a6/57/sodo-pizza-cafe.jpg',
        rating: 4,
        review: 'Sodo started as a pop­up at the E5 Bakehouse before setting up shop just up the road, with success spawning sister sites in Hoxton and Walthamstow. I’ve been to this branch a few times now and only once has it not been heaving with typically hairy east London sorts.  They’re not here for the decor. Describing Sodo as ‘rough around the edges’ would be harsh on rough edges. It’s brightened up no end by Italian staff with accents as thick as bricks – plus there’s a nice little garden out the back – but Sodo’s certainly not a looker. The pizza, of course, is the draw.  Margheritas never have a lot to hide behind and ours here was superb: the Neapolitan­-style sourdough (Sodo, geddit?) base was thin, crisp, delicious, and topped with good­ quality tomato, mozzarella and fresh basil. The ‘winter goat’ was even better, with goat’s cheese, walnuts, caramelised onions and olives scattered liberally but judiciously for a balanced and brilliant combo. Craft beer from the likes of Beavertown and Fourpure keep the beards fluffed.',
        createdBy: users[1]
      }, {
        name: 'Crate Brewery',
        address: {
          line1: 'Unit 7, White Building',
          city: 'London',
          postcode: 'E9 5EN'
        },
        image: 'https://thefunkytruth.files.wordpress.com/2012/09/crate3.jpg',
        rating: 4,
        review: 'Like the Great Plains being roamed by herds of majestic bison, the warehouses of Hackney Wick form the perfect natural habitat for hipsters to thrive in great numbers. You’ll find plenty of them at Crate Brewery, where in addition to excellent house-brewed beers and ciders on tap, they dish out brilliant thin-crust pizzas. At weekends, there are DJs spinning and a party vibe, and there’s masses of outdoor space for your crew to sit by the canal. There’s even a little rowboat you can sit in - just try not to tip it over, unless you want to contract leptospirosis.',
        createdBy: users[1]
      }, {
        name: 'Martello Hall',
        address: {
          line1: '137 Mare St',
          city: 'London',
          postcode: 'E8 3RH'
        },
        image: 'http://www.smarksthespots.com/wp-content/uploads/2017/03/martello_hall_london_smarksthespots_blog_05.jpg',
        rating: 3,
        review: 'Martello Hall is your classic gentrification cinderella story: ugly old boozer transformed into bright, trendy industrial-feeling space serving craft beer and wine on tap, and pizza. It’s the kind of place that works well for a casual date, a drinks meet-up, a group-get together, or - as we discovered first-hand - a late night pizza session. The kitchen’s open until midnight on weekdays, and 3 am on weekends.  Speaking of pizza, the stuff you’ll find here is quite good. Martello Hall’s pizzas are the brainchild of one of the original Pizza Express chefs, and we like to think that what’s going on here is what might have happened if Pizza Express didn’t become a chain to appeal to the masses and went all out on pizza innovation instead. Martello Hall does a very nice margherita, but you can also expect to find toppings like beetroot pesto or roasted squash and hazelnuts. A few of them may sound questionable on paper, but we’ve enjoyed all of the results.',
        createdBy: users[1]
      }, {
        name: 'Homeslice Pizza Shoreditch',
        address: {
          line1: '374-378 Old Street',
          city: 'London',
          postcode: 'EC1V 9LT'

        },
        image: 'https://static1.squarespace.com/static/558d04b2e4b0750606e349c9/55a226d6e4b0417147b993be/55d4375ce4b05b3ce743c477/1439971166177/_MG_5077.jpg?format=1000w',
        rating: 4,
        review: 'Your difficult friend Becks is visiting from Earlsfield, but you want to be sure to get a good meal while avoiding an evening of bitching and moaning about ‘challenging’ ethnic food and small portions. Take them to Homeslice, a Valhalla for anyone who loves pizza, and let the sweet taste of red sauce and mozzarella wash over you like that one time you went to The Berkeley and got a neck massage. The pizzas are pricey but they’re huge, and you can get them by the slice if you’re indecisive or not super hungry. The drinks list is short but as it includes prosecco on tapyou don\'t need any other options anyway.',
        createdBy: users[2]
      }])
      .then((restaurants) => {
        console.log(`${restaurants.length} restaurants were created!`);
        for (var i = 0; i < restaurants.length; i++) {
          const createdId = restaurants[i].createdBy.id;
          for (var j = 0; j < users.length; j++) {
            if (users[j].id === createdId) {
              users[j].restaurantsCreated.push(restaurants[i].id);
              users[j].save();
            }
          }
        }
        console.log(users);
      });
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
