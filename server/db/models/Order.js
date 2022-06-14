const Sequelize = require('sequelize');
const db = require('../db');
//const axios = require('axios');

const Order = db.define('order', {
  products: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  },
  shoeSize: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  orderStatus: {
    type: Sequelize.DataTypes.ENUM('Open', 'Fulfilled', 'Shipped', 'Delivered'),
    defaultValue: 'Open',
  },
  shippingDate: {
    type: Sequelize.DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  payMethod: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  confirmCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Order;
