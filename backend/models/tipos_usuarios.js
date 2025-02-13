const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')

const tipos_usuarios = database.define('tipos_usuarios', {
    id_tipo: {
        type: Sequelize.INTEGER,
<<<<<<< HEAD
        AllowNUll: false,
        primaryKey: true,
        autoIncrement: true
=======
        primaryKey: true,
        autoIncrement: true,
>>>>>>> a047e5d7902b87da0614a548bd17934acb0971c2
    },
    permissao: {
        type: Sequelize.STRING,
        AllowNUll: false
    },
});

module.exports = tipos_usuarios