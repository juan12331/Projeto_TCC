const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')
const quartos = require('./quartos')

const fotos_quartos = database.define('fotos_quartos', {
    id_foto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    imagem: {
        type: Sequelize.TEXT('medium'),
        AllowNUll: false
    },
    id_quarto: {
        type: Sequelize.INTEGER,
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