//this is the access point for all things database related!
const Sequelize = require('sequelize')
const db = require('./db')

const User = require('./models/User');
const Payment = require('./models/Payment');
const Order = require('./models/Order');
const Product = require('./models/Product');

//associations could go here!

const Product_Order = db.define('Product_Order', {
  quantity: Sequelize.INTEGER
});

User.hasMany(Payment)
User.hasMany(Order)

Payment.hasMany(Order)
Payment.belongsTo(User)

Order.belongsTo(User)
Order.belongsTo(Payment)

Order.belongsToMany(Product, {through: Product_Order})
Product.belongsToMany(Order, {through: Product_Order})

// const test = async () => {
//   try{
//     const data = await Order.findAll({
//       where: {
//         userId: 1,
//         orderStatus: 'Open'
//       },
//       include: [
//         {
//           model: Product
//         },{
//           model: Payment
//         }
//       ]
//     })
//     // console.log(data[0].products[0])
//     // console.log(data[0].products[0].Product_Order)
//     console.log(data[0])
//   } catch(e){
//     console.log(e)
//   }
// }
// test()
//Maybe include Product in the future, but right now -> product holds just storage information

module.exports = {
  db,
  models: {
    User,
    Payment,
    Order,
    Product,
  },
};
