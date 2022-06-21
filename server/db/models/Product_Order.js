const Sequelize = require('sequelize');
const db = require('../db');
//const axios = require('axios');

const Product_Order = db.define('Product_Order', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
});

module.exports = Product_Order;
