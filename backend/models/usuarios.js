const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')

const usuarios = database.define('usuarios', {
    cpf: {
        type: Sequelize.STRING,
        AllowNUll: false,
        primaryKey: true,
        unique: true
    },
    nome: {
        type: Sequelize.STRING,
        AllowNUll: false
    },
    email : {
        type: Sequelize.STRING,
        AllowNUll: false
    },
    senha: {
        type: Sequelize.STRING,
        AllowNUll: false
    },
    papel: {
        type: Sequelize.ENUM('user', 'adm'),
        defaultValue: 'user',
        AllowNUll: false
    },
    telefone: {
        type: Sequelize.STRING(20),
        AllowNUll: false
    }
});


module.exports = usuarios