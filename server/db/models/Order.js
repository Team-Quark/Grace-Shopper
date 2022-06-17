const Sequelize = require('sequelize');
const db = require('../db');
//const axios = require('axios');

const Order = db.define('order', {
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  orderStatus: {
    type: Sequelize.DataTypes.ENUM('Open', 'Closed'),
    defaultValue: 'Open',
  },
  confirmCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Order;
