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
  shoeType: {
    type: Sequelize.ENUM,
    values: ['running', 'basketball'],
    defaultValue: 'basketball',
  }
})

Product.findItem = async function(item){
  try{
    const data = await Product.findAll({
      where: {
        id: item.id
      }
    })
    return data;
  } catch(e){
    const error = Error('bad list')
    throw error;
  }
}

Product.addItem = async function(item){
  try{
    const data = await Product.findAll({
      where: {
        id: item.id
      }
    })
    return data;
  } catch(e){
    const error = Error('bad list')
    throw error;
  }
}

module.exports = Product
