const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')
const quartos = require('./quartos')

const avaliacoes_quartos = database.define('usuarios', {
    id_reclamacao: {
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
    id_quarto: {
        type: Sequelize.STRING,
        AllowNUll: false,
        references: {
            model: quartos,
            key: 'id_quarto'
        },
    },
});

quartos.hasMany(avaliacoes_quartos, {
    foreignKey: 'id_quarto'
})

avaliacoes_quartos.belongsTo(quartos, {
    foreignKey: 'id_quarto'
});


module.exports = avaliacoes_quartos