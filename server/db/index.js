//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Payment = require('./models/Payment');
const Order = require('./models/Order');
const Product = require('./models/Product');

//associations could go here!

User.hasMany(Payment)
User.hasMany(Order)

Payment.belongsTo(User)
Order.belongsTo(User)

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
