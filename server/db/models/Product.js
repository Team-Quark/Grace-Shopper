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
    defaultValue: 'https://cdn.flightclub.com/750/TEMPLATE/251353/1.jpg'
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
})

Product.findItem = async function(list){
  try{
    const data = await Product.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: list
        }
      }
    })
    return data;
  } catch(e){
    const error = Error('bad list')
    throw error;
  }
}

module.exports = Product
