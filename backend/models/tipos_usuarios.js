const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')
const usuarios = require('./usuarios')

const tipos_usuarios = database.define('tipos_usuarios', {
    id: {
        type: Sequelize.STRING,
        AllowNUll: false,
        primaryKey: true,
        unique: true
    },
    permissão: {
        type: Sequelize.STRING,
        AllowNUll: false
    },
    cpf: {
        type: Sequelize.STRING,
        AllowNUll: false,
        references: {
            model: usuarios,
            key: 'cpf'
        },
    },
});

usuarios.hasMany(tipos_usuarios, {
    foreignKey: 'cpf'
})

tipos_usuarios.belongsTo(usuarios, {
    foreignKey: 'cpf'
});


module.exports = usuarios