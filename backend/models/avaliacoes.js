const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')
const usuarios = require('./usuarios')

const avaliacoes = database.define('usuarios', {
    id_avaliacao: {
        type: Sequelize.STRING,
        AllowNUll: false,
        primaryKey: true,
        unique: true
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
    foreignKey: 'id_quarto'
})

avaliacoes.belongsTo(usuarios, {
    foreignKey: 'id_quarto'
});


module.exports = avaliacoes