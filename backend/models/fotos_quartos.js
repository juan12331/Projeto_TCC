const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')
const quartos = require('./quartos')

const fotos_quartos = database.define('fotos_quartos', {
    id_foto: {
        type: Sequelize.STRING,
        AllowNUll: false,
        primaryKey: true,
        unique: true
    },
    imagem: {
        type: Sequelize.STRING(300),
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

quartos.hasMany(fotos_quartos, {
    foreignKey: 'id_quarto'
})

fotos_quartos.belongsTo(quartos, {
    foreignKey: 'id_quarto'
});


module.exports = fotos_quartos