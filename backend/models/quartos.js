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
    nome: {
        type: Sequelize.STRING,
        AllowNUll: false,
    },
    preco: {
        type: Sequelize.DECIMAL,
        AllowNUll: false
    },
    descricao: {
        type: Sequelize.STRING(500),
        AllowNUll: false
    }
    
});


module.exports = quartos