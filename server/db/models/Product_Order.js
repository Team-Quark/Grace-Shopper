const Sequelize = require('sequelize');
const db = require('../db');
//const axios = require('axios');

const Product_Order = db.define('Product_Order', {
  quantity: Sequelize.INTEGER
});

module.exports = Product_Order;
