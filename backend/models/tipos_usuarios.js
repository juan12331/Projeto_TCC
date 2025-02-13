const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')

const tipos_usuarios = database.define('tipos_usuarios', {
    id_tipo: {
        type: Sequelize.INTEGER,
        AllowNUll: false,
        primaryKey: true,
        autoIncrement: true

    },
    permissao: {
        type: Sequelize.STRING,
        AllowNUll: false
    },
});

module.exports = tipos_usuarios