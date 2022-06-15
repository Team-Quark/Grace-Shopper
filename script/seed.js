'use strict';

const {
  db,
  models: { User, Payment, Product },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await User.create({
    email: 'cody@gmail.com',
    password: '123',
    firstName: 'cody',
    lastName: 'martin',
    address: '123 Main St, NY, 12312',
    cart: [
      { id: 1, size: 2 },
      { id: 2, size: 10 },
    ],
  });

  const products = await Product.create({
    name: 'Yeezy',
    imageUrl:
      'https://i.pinimg.com/564x/35/9d/1d/359d1d33ca0cca4e58b7a8113c2977c1.jpg',
    description: 'kanye',
    price: 301.5,
    availableSize: 10,
  });
  console.log(`seeded successfully`);
}
/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
