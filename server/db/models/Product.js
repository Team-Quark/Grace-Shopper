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
    defaultValue: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-mens-shoes-5QFp5Z.png'
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
