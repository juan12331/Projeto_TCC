const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')

const tipos_usuarios = database.define('tipos_usuarios', {
    id_tipo: {
        type: Sequelize.STRING,
        AllowNUll: false,
        primaryKey: true,
        unique: true,
        AutoIncrement: true
    },
    permissao: {
        type: Sequelize.STRING,
        AllowNUll: false
    },
});

module.exports = tipos_usuarios