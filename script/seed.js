'use strict';

const {
  db,

  models: { User, Payment, Product, Order, Product_Order },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const cody = await User.create({
    email: 'cody@gmail.com',
    password: '123',
    firstName: 'cody',
    lastName: 'martin',
    address: '123 Main St, NY, 12312',

    cart: [
      {
        imageUrl:
          'https://images.stockx.com/images/adidas-yeezy-boost-700-hi-red-red.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1655130455&q=80',
        name: 'adidas Yeezy Boost 700 Hi-Res Red',
        price: 344,
        availableSize: 9.5,
        description: 'Lorem Ipsum',
      },
      {
        imageUrl:
          'https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Visionaire.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1654610623&q=80',
        name: `Jordan 1 Retro High OG Visionaire`,
        price: 214,
        availableSize: 8,
        description: 'Lorem Ipsum',
      },
    ],

    admin: true,
  });

  for (let uId = 0; uId < 10; uId++) {
    await User.create({
      email: `cody${uId + 1}@gmail.com`,
      password: '123',
      firstName: `cody${uId + 1}`,
      lastName: `martin${uId + 1}`,
      address: '123 Main St, NY, 12312',
      admin: Math.floor(Math.random() * 2) === 1 ? true : false,
    });
  }
  console.log(`seeded Users successfully`);

  // fake credit card numbers
  const fakeCCArr = [
    {
      CardType: 'VISA',
      ccNo: '4024007124403063',
      expDate: '2023-02-01',
      securityCode: '207',
    },
    {
      CardType: 'VISA',
      ccNo: '4929046960562505',
      expDate: '2027-02-01',
      securityCode: '816',
    },
    {
      CardType: 'VISA',
      ccNo: '4916479079302064',
      expDate: '2026-07-01',
      securityCode: '364',
    },
    {
      CardType: 'VISA',
      ccNo: '4556627816535777',
      expDate: '2026-04-01',
      securityCode: '400',
    },
    {
      CardType: 'VISA',
      ccNo: '4539944413369548',
      expDate: '2026-11-01',
      securityCode: '456',
    },
    {
      CardType: 'VISA',
      ccNo: '4485878132912788',
      expDate: '2024-09-01',
      securityCode: '125',
    },
    {
      CardType: 'VISA',
      ccNo: '4539105828766088',
      expDate: '2024-01-01',
      securityCode: '106',
    },
    {
      CardType: 'VISA',
      ccNo: '4916243132720138',
      expDate: '2022-10-01',
      securityCode: '661',
    },
    {
      CardType: 'VISA',
      ccNo: '4024007153678429',
      expDate: '2023-11-01',
      securityCode: '588',
    },
    {
      CardType: 'VISA',
      ccNo: '4092518795033887',
      expDate: '2025-06-01',
      securityCode: '153',
    },
  ];
  // Getting All the users added to the db
  let  findAllUsers = await User.findAll({
    include: {
      model: Order,
      include: Product
    }
  });

  // Creating Payment Options (associates random user to payment)
  for (let pId = 0; pId < fakeCCArr.length; pId++) {
    // randomly selects user that exist in the db
    let randomUser =
      findAllUsers[Math.floor(Math.random() * findAllUsers.length)];
    let newPayment = await Payment.create({
      ccNo: fakeCCArr[pId].ccNo,
      expDate: fakeCCArr[pId].expDate,
      securityCode: fakeCCArr[pId].securityCode,
      firstName: randomUser.firstName,
      lastName: randomUser.lastName,
      address: randomUser.address,
    });

    await randomUser.addPayment(newPayment);
  }
  console.log(`seeded Payments successfully`);

  // Creating Products
 const jordans = await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/1800/TEMPLATE/296982/1.jpg',
    name: 'Jordan 4 Retro Infrared',
    price: 172,
    availableSize: 7,
    description: 'Lorem Ipsum',
  });

 const yeezys = await Product.create({
    imageUrl:
      'https://images.stockx.com/images/adidas-yeezy-boost-700-hi-red-red.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1655130455&q=80',
    name: 'adidas Yeezy Boost 700 Hi-Res Red',
    price: 344,
    availableSize: 9.5,
    description: 'Lorem Ipsum',
  });

  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/750/TEMPLATE/299069/1.jpg',
    name: ' Jordan 1 Retro High OG Stage Haze ',
    price: 200,
    availableSize: 12,
    description: 'Lorem Ipsum',
  });

  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/750/TEMPLATE/800502/1.jpg',
    name: 'adidas Yeezy Boost 350 V2 Zebra',
    price: 282,
    availableSize: 15,
    description: 'Lorem Ipsum',
  });

  await Product.create({
    imageUrl:
      'https://images.stockx.com/images/Air-Jordan-6-Retro-Red-Oreo-Updated.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1654005886&q=80',
    name: 'Jordan 6 Retro Red Oreo',
    price: 191,
    availableSize: 10.5,
    description: 'Lorem Ipsum',
  });

  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/750/TEMPLATE/253246/1.jpg',
    name: `Nike Air Force 1 Low '07 Black`,
    price: 100,
    availableSize: 11,
    description: 'Lorem Ipsum',
  });

  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/750/TEMPLATE/294004/1.jpg',
    name: `Nike KD 14 Aunt Pearl`,
    price: 132,
    availableSize: 11,
    description: 'Lorem Ipsum',
  });

  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/750/TEMPLATE/313749/1.jpg',
    name: `Nike Air Max 1 Kasina Won-Ang Orange`,
    price: 196,
    availableSize: 12,
    description: 'Lorem Ipsum',
  });

  await Product.create({
    imageUrl:
      'https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Visionaire.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1654610623&q=80',
    name: `Jordan 1 Retro High OG Visionaire`,
    price: 214,
    availableSize: 8,
    description: 'Lorem Ipsum',
  });

  await Product.create({
    imageUrl:
      'https://images.stockx.com/images/Air-Jordan-4-Retro-Zen-Master.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1647374160&q=80',
    name: `Jordan 4 Retro Zen Master`,
    price: 132,
    availableSize: 11,
    description: 'Lorem Ipsum',
  });

  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/1800/TEMPLATE/253215/1.jpg',
    name: `Dunk Low - Panda (Black/White)`,
    price: 200,
    availableSize: 11,
    description: 'Lorem Ipsum',
    shoeType: 'running'
  });

  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/750/TEMPLATE/299345/1.jpg',
    name: `Yeezy Boost 350 V2 'Bone'`,
    price: 300,
    availableSize: 10,
    description: 'Lorem Ipsum',
    shoeType: 'running'
  });

  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/750/TEMPLATE/303273/1.jpg',
    name: `Yeezy Foam Runner 'Onyx'`,
    price: 150,
    availableSize: 13,
    description: 'Lorem Ipsum',
    shoeType: 'running'
  });
  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/1800/TEMPLATE/801866/1.jpg',
    name: `Off-White X Air Vapormax`,
    price: 800,
    availableSize: 10,
    description: 'Lorem Ipsum',
    shoeType: 'running'
  });
  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/750/TEMPLATE/248952/1.jpg',
    name: `Air Jordan 11 Retro 'Cool Grey'`,
    price: 150,
    availableSize: 6,
    description: 'Lorem Ipsum',
  });
  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/750/TEMPLATE/296986/1.jpg',
    name: `Dunk Low - Rose Whisper`,
    price: 150,
    availableSize: 10,
    description: 'Lorem Ipsum',
    shoeType: 'running'
  });
  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/1800/TEMPLATE/802501/1.jpg',
    name: `Yeezy Boost 700 - Wave Runner`,
    price: 400,
    availableSize: 10,
    description: 'Lorem Ipsum',
    shoeType: 'running'
  });
  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/1800/TEMPLATE/296515/1.jpg',
    name: `Yeezy Boost 350 V2 'Onyx'`,
    price: 350,
    availableSize: 10,
    description: 'Lorem Ipsum',
    shoeType: 'running'
  });
  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/1800/TEMPLATE/246152/1.jpg',
    name: `Air Jordan 1 Retro Low OG 'Starfish'`,
    price: 200,
    availableSize: 8,
    description: 'Lorem Ipsum',
    shoeType: 'running'
  });
  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/750/TEMPLATE/302235/1.jpg',
    name: `Nike GT Cut 'Pure PLatinum Pink Blast'`,
    price: 400,
    availableSize: 7,
    description: 'Lorem Ipsum',
    shoeType: 'basketball'
  });
  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/1800/TEMPLATE/150565/1.jpg',
    name: `Kyrie 5 - Spongebob`,
    price: 300,
    availableSize: 10,
    description: 'Lorem Ipsum',
    shoeType: 'basketball'
  });
  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/1800/TEMPLATE/299066/1.jpg',
    name: `Air Jordan 4 - 'Military Black`,
    price: 300,
    availableSize: 8,
    description: 'Lorem Ipsum',
    shoeType: 'running'
  });
  await Product.create({
    imageUrl:
      'https://cdn.flightclub.com/750/TEMPLATE/176533/1.jpg',
    name: `Air Jordan 1 - Dior`,
    price: 9000,
    availableSize: 8,
    description: 'Lorem Ipsum',
    shoeType: 'running'
  });

  for (let prId = 0; prId < 11; prId++) {
    await Product.create({
      name: `Shoe ${prId + 1} `,
      price: 200,
      availableSize: Math.floor(Math.random() * 8) + 7,
      description: 'Lorem Ipsum',
      shoeType: ['running', 'basketball'][Math.floor(Math.random() * 2)]
    });
  }

  console.log(`seeded Products successfully`);

  const allProducts = await Product.findAll();
  // Creating Orders

  // generating random confirmation Code Strings
  function randomConfirmCode() {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // for (let oId = 0; oId < 21; oId++) {
  //   // associating an existing user to an order
  //   let randomUser =
  //     findAllUsers[Math.floor(Math.random() * findAllUsers.length)];

  //   // the first user cody (Line 18) will have this cart
    // if(oId === 0){
    //  const order1 = await Order.create({
    //     shippingAddress: cody.address,
    //     orderStatus: 'Open',
    //     confirmCode: randomConfirmCode(),
    //   });
    //   order1.addProducts([jordans, yeezys], {
    //     through: {
    //        quantity: 1
    //     }
    //   });
    //   cody.addOrder(order1)

  //   }else {
  //     await Order.create({
  //       shippingAddress: randomUser.address,
  //       orderStatus: ['Open', 'Closed'][
  //         Math.floor(Math.random() * 2)
  //       ],
  //       confirmCode: randomConfirmCode(),
  //     });
  //   }
  // }
  for(let oId = 1; oId < 10; oId++){
    if(oId === 1){
      const order1 = await Order.create({
         shippingAddress: cody.address,
         orderStatus: 'Open',
         confirmCode: randomConfirmCode(),
       });
       order1.addProducts([jordans, yeezys], {
         through: {
            quantity: 1
         }
       });
       cody.addOrder(order1)
    } else {
      const user = findAllUsers[oId]
      const order = await Order.create({
        shippingAddress: user.address,
        confirmCode: randomConfirmCode()
      });

      user.addOrder(order);
    }
  }

  console.log(`seeded Orders successfully`);
// Typical Sequel querying
  // let findCody = await User.findOne({
  //   where: {
  //     id: 1
  //   },
  //   include: {
  //     model: Order,
  //     include: {
  //       model: Product,
  //       through:
  //        "quantity",

  //     }
  //   }
  // });
// testing out Sequelize mixins ()
  let findCody = await cody.getOrders({
    include:{
      model: Product,
      attributes: ['price'],
      // joinTableAttributes: ['quantity']
      through: {
        attributes: ['quantity']

      }
    },
  } )

  // Will return to web scraping - Sheriff

  // const response = await fetch('https://stockx.com/sneakers');
  // 	const html = await response.text();

  //   const $ = cheerio.load(html);
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
