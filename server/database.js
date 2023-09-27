require('dotenv').config();
const {Sequelize} = require('sequelize')
const {CONNECTION_STRING} = process.env; 

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: 'postgres', 
  logging: false,
});

module.exports = {
    sequelize
}