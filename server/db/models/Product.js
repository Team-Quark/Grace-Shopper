const Sequelize = require('sequelize')
const db = require('../db')


const Product = db.define('product', {

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.pinimg.com/564x/35/9d/1d/359d1d33ca0cca4e58b7a8113c2977c1.jpg'
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  availableSize: {
    type: Sequelize.FLOAT,
    validate: {
      len: [1,15],
    }
  },

})

module.exports = Product
