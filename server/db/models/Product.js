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
