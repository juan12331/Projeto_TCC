const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')
const usuarios = require('./usuarios')

const avaliacoes = database.define('avaliacoes', {
    id_avaliacao: {
        type: Sequelize.INTEGER,
        AllowNUll: false,
        primaryKey: true,
        autoIncrement: true
    },
    avaliacao_texto: {
        type: Sequelize.STRING(300),
        AllowNUll: false
    },
    nota: {
        type: Sequelize.INTEGER,
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

usuarios.hasMany(avaliacoes, {
    foreignKey: 'cpf'
})

avaliacoes.belongsTo(usuarios, {
    foreignKey: 'cpf'
});


module.exports = avaliacoes