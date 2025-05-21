const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime')

const quartos = database.define('quartos', {
    id_quarto: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    preco: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    ar_condicionado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    tv: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    wifi: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    ducha: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    frigobar: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    toalhas: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    cozinha: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});

module.exports = quartos