const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')

const quartos = database.define('quartos', {
    id_quarto: {
        type: Sequelize.STRING,
        AllowNUll: false,
        primaryKey: true,
        unique: true
    },
    
});


module.exports = quartos