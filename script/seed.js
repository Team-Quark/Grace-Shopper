"use strict";

const {
  db,

  models: { User, Payment, Product, Order },
} = require('../server/db');


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await User.create({

    email: "cody@gmail.com",
    password: "123",
    firstName: "cody",
    lastName: "martin",
    address: "123 Main St, NY, 12312",

    cart: [
      { id: 1, size: 2 },
      { id: 2, size: 10 },
    ],

    admin: true,
  });

  for (let uId = 0; uId < 21; uId++) {
    await User.create({
      email: `cody${uId + 1}@gmail.com`,
      password: "123",
      firstName: `cody${uId + 1}`,
      lastName: `martin${uId + 1}`,
      address: "123 Main St, NY, 12312",
      cart: [
        { id: 1, size: 2 },
        { id: 2, size: 10 },
      ],
      admin: (Math.floor(Math.random() * 2) === 1 ? true : false)
    });
  }
  console.log(`seeded Users successfully`);

  // fake credit card numbers
  const fakeCCArr = [
    {
      CardType: "VISA",
      ccNo: "4024007124403063",
      expDate: "2023-02-01",
      securityCode: "207",
    },
    {
      CardType: "VISA",
      ccNo: "4929046960562505",
      expDate: "2027-02-01",
      securityCode: "816",
    },
    {
      CardType: "VISA",
      ccNo: "4916479079302064",
      expDate: "2026-07-01",
      securityCode: "364",
    },
    {
      CardType: "VISA",
      ccNo: "4556627816535777",
      expDate: "2026-04-01",
      securityCode: "400",
    },
    {
      CardType: "VISA",
      ccNo: "4539944413369548",
      expDate: "2026-11-01",
      securityCode: "456",
    },
    {
      CardType: "VISA",
      ccNo: "4485878132912788",
      expDate: "2024-09-01",
      securityCode: "125",
    },
    {
      CardType: "VISA",
      ccNo: "4539105828766088",
      expDate: "2024-01-01",
      securityCode: "106",
    },
    {
      CardType: "VISA",
      ccNo: "4916243132720138",
      expDate: "2022-10-01",
      securityCode: "661",
    },
    {
      CardType: "VISA",
      ccNo: "4024007153678429",
      expDate: "2023-11-01",
      securityCode: "588",
    },
    {
      CardType: "VISA",
      ccNo: "4092518795033887",
      expDate: "2025-06-01",
      securityCode: "153",
    },
    {
      CardType: "VISA",
      ccNo: "4024007124403063",
      expDate: "2023-02-01",
      securityCode: "207",
    },
    {
      CardType: "VISA",
      ccNo: "4929046960562505",
      expDate: "2027-02-01",
      securityCode: "816",
    },
    {
      CardType: "VISA",
      ccNo: "4916479079302064",
      expDate: "2026-07-01",
      securityCode: "364",
    },
    {
      CardType: "VISA",
      ccNo: "4556627816535777",
      expDate: "2026-04-01",
      securityCode: "400",
    },
    {
      CardType: "VISA",
      ccNo: "4539944413369548",
      expDate: "2026-11-01",
      securityCode: "456",
    },
    {
      CardType: "VISA",
      ccNo: "4485878132912788",
      expDate: "2024-09-01",
      securityCode: "125",
    },
    {
      CardType: "VISA",
      ccNo: "4539105828766088",
      expDate: "2024-01-01",
      securityCode: "106",
    },
    {
      CardType: "VISA",
      ccNo: "4916243132720138",
      expDate: "2022-10-01",
      securityCode: "661",
    },
    {
      CardType: "VISA",
      ccNo: "4024007153678429",
      expDate: "2023-11-01",
      securityCode: "588",
    },
    {
      CardType: "VISA",
      ccNo: "4092518795033887",
      expDate: "2025-06-01",
      securityCode: "153",
    },
  ];
  // Getting All the users added to the db
  let findAllUsers = await User.findAll();

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
  await Product.create({
    imageUrl:
      "https://images.stockx.com/images/Air-Jordan-4-Retro-Infrared-GS-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=75&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1646935173&q=80",
    name: "Jordan 4 Retro Infrared",
    price: 172,
    availableSize: 7,
    description: "Lorem Ipsum",
  });

  await Product.create({
    imageUrl:
      "https://images.stockx.com/images/adidas-yeezy-boost-700-hi-red-red.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1655130455&q=80",
    name: "adidas Yeezy Boost 700 Hi-Res Red",
    price: 344,
    availableSize: 9.5,
    description: "Lorem Ipsum",
  });

  await Product.create({
    imageUrl:
      "https://images.stockx.com/images/adidas-yeezy-boost-700-hi-red-red.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1655130455&q=80",
    name: " Jordan 1 Retro High OG Stage Haze ",
    price: 200,
    availableSize: 12,
    description: "Lorem Ipsum",
  });

  await Product.create({
    imageUrl:
      "https://images.stockx.com/images/Adidas-Yeezy-Boost-350-V2-Zebra-Product-1.jpg?fit=fill&bg=FFFFFF&w=140&h=75&fm=avif&auto=compress&trim=color&dpr=1&updated_at=1606321670&q=80",
    name: "adidas Yeezy Boost 350 V2 Zebra",
    price: 282,
    availableSize: 15,
    description: "Lorem Ipsum",
  });

  await Product.create({
    imageUrl:
      "https://images.stockx.com/images/Air-Jordan-6-Retro-Red-Oreo-Updated.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1654005886&q=80",
    name: "Jordan 6 Retro Red Oreo",
    price: 191,
    availableSize: 10.5,
    description: "Lorem Ipsum",
  });

  await Product.create({
    imageUrl:
      "https://images.stockx.com/images/Nike-Air-Force-1-07-Black-Black-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=75&fm=avif&auto=compress&trim=color&dpr=1&updated_at=1607050715&q=80",
    name: `Nike Air Force 1 Low '07 Black`,
    price: 100,
    availableSize: 11,
    description: "Lorem Ipsum",
  });

  await Product.create({
    imageUrl:
      "https://images.stockx.com/images/Nike-KD-14-Aunt-Pearl-Product.jpg?fit=fill&bg=FFFFFF&w=140&h=75&fm=avif&auto=compress&trim=color&dpr=1&updated_at=1649428628&q=80",
    name: `Nike KD 14 Aunt Pearl`,
    price: 132,
    availableSize: 11,
    description: "Lorem Ipsum",
  });

  await Product.create({
    imageUrl:
      "https://images.stockx.com/images/Nike-Air-Max-1-Kasina-Won-Ang-Orange.jpg?fit=fill&bg=FFFFFF&w=140&h=75&fm=avif&auto=compress&trim=color&dpr=1&updated_at=1653367993&q=80",
    name: `Nike Air Max 1 Kasina Won-Ang Orange`,
    price: 196,
    availableSize: 12,
    description: "Lorem Ipsum",
  });

  await Product.create({
    imageUrl:
      "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Visionaire.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1654610623&q=80",
    name: `Jordan 1 Retro High OG Visionaire`,
    price: 214,
    availableSize: 8,
    description: "Lorem Ipsum",
  });

  await Product.create({
    imageUrl:
      "https://images.stockx.com/images/Air-Jordan-4-Retro-Zen-Master.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=avif&auto=compress&dpr=1&trim=color&updated_at=1647374160&q=80",
    name: `Jordan 4 Retro Zen Master`,
    price: 132,
    availableSize: 11,
    description: "Lorem Ipsum",
  });

  for(let prId = 0; prId < 11; prId++ ){
    await Product.create({

      name: `Shoe ${prId + 1} `,
      price: 200,
      availableSize: (Math.floor(Math.random() * 8) + 7),
      description: "Lorem Ipsum",
    });
  }

  console.log(`seeded Products successfully`);

  const allProducts = await Product.findAll();
  // Creating Orders

  // generating random confirmation Code Strings
  function randomConfirmCode() {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  for (let oId = 0; oId < 21; oId++) {
    // associating a random user to the order
    let randomUser =
      findAllUsers[Math.floor(Math.random() * findAllUsers.length)];
    let userPayMethod = await randomUser.getPayments();
    const orderdProductsArr = [];
    // creating random amounts of products being ordered
    for (
      let prodArrId = 0;
      prodArrId < Math.floor(Math.random() * 12) + 1;
      prodArrId++
    ) {
      orderdProductsArr.push(
        allProducts[Math.floor(Math.random() * allProducts.length)]
        );
      }
      // console.log(allProducts[0])
// console.log(orderdProductsArr)
    await Order.create({
      products: orderdProductsArr,
      shippingAddress: randomUser.address,
      // shipping date ranomized between 1-1-2022 & 1-1-2023
      shippingDate: new Date(
        new Date(2022, 0, 1).getTime() +
          Math.random() *
            (new Date(2023, 0, 1).getTime() - new Date(2022, 0, 1).getTime())
      ),
      total: orderdProductsArr.reduce(({ price }, total) => {
        return price + total;
      }, 0),
      orderStatus: ["Open", "Fulfilled", "Shipped", "Delivered"][
        Math.floor(Math.random() * 4)
      ],
      payMethod: userPayMethod.length
        ? Math.floor(Math.random() * userPayMethod.length)
        : fakeCCArr[Math.floor(Math.random() * fakeCCArr.length)].ccNo,
      confirmCode: randomConfirmCode(),
    });
  }

  console.log(`seeded Orders successfully`);


  // Will return to web scraping - Sheriff

  // const response = await fetch('https://stockx.com/sneakers');
  // 	const html = await response.text();

  //   const $ = cheerio.load(html);
}


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
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
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
