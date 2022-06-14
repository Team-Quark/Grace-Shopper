const Sequelize = require('sequelize');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');

const Payment = db.define('payment', {
  ccNo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isCreditCard: true, // Double check this
    },
  },
  expDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  securityCode: {
    type: Sequelize.STRING,
    validate: {
      len: [3, 4], //allows length between 3 and 4
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

//exporting Payment Model
module.exports = Payment;
