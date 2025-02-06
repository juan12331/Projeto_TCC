const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')
const tipos_usuarios = require('./tipos_usuarios')

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
    id_tipo: {
        type: Sequelize.STRING,
        defaultValue: '1',
        AllowNUll: false,
         references: {
            model: tipos_usuarios,
            key: 'id_tipo'
         },
    },
    telefone: {
        type: Sequelize.STRING(20),
        AllowNUll: false
    },

});

 tipos_usuarios.hasOne(usuarios, {
    foreignKey: 'id_tipo'
 })

 usuarios.belongsTo(tipos_usuarios, {
     foreignKey: 'id_tipo'
 });


module.exports = usuarios