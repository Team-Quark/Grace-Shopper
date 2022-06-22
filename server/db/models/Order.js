const Sequelize = require('sequelize');
const db = require('../db');
//const axios = require('axios');

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
    defaultValue: randomConfirmCode(),

  },
});

module.exports = Order;
