const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')

const quartos = database.define('quartos', {
    id_quarto: {
        type: Sequelize.INTEGER,
        AllowNUll: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        AllowNUll: false,
    },
    preco: {
        type: Sequelize.INTEGER,
        AllowNUll: false
    },
    descricao: {
        type: Sequelize.STRING(500),
        AllowNUll: false
    }
    
    
});



module.exports = quartos