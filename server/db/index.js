//this is the access point for all things database related!
// const Sequelize = require('sequelize')
const db = require('./db');

const User = require('./models/User');
const Payment = require('./models/Payment');
const Order = require('./models/Order');
const Product = require('./models/Product');
const Product_Order = require('./models/Product_Order');

//associations could go here!
// const Product_Order = db.define('Product_Order', {
//   quantity: {
//     type: Sequelize.INTEGER,
//     defaultValue: 1
//   }
// });

User.hasMany(Payment)
User.hasMany(Order)

Payment.hasMany(Order)
Payment.belongsTo(User)

Order.belongsTo(User)
Order.belongsTo(Payment)

Order.belongsToMany(Product, {through: Product_Order})
Product.belongsToMany(Order, {through: Product_Order})
//Maybe include Product in the future, but right now -> product holds just storage information

module.exports = {
  db,
  models: {
    User,
    Payment,
    Order,
    Product,
    Product_Order,
  },
};
