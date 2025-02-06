const Sequelize = require('sequelize')
const database = require('../config/sequelize')
// const { default_type } = require('mime')
// const quartos = require('./quartos')
// const usuarios = require('./usuarios')

// const reservas = database.define('reservas', {
//     id: {
//         type: Sequelize.STRING,
//         AllowNUll: false,
//         primaryKey: true,
//         unique: true
//     },
//     cpf: {
//         type: Sequelize.STRING,
//         AllowNUll: false,
//         references: {
//             model: usuarios,
//             key: 'cpf'
//         },
//     },
//     id_quarto: {
//         type: Sequelize.STRING,
//         AllowNUll: false,
//         references: {
//             model: quartos,
//             key: 'id_quarto'
//         },
//     },
//     data_inicio: {
//         type: Sequelize.DATE,
//         AllowNUll: false
//     },
//     data_final: {
//         type: Sequelize.DATE,
//         AllowNUll: false
//     },
    
// });

// usuarios.hasMany(reservas, {
//     foreignKey: 'cpf'
// })

// reservas.belongsTo(usuarios, {
//     foreignKey: 'cpf'
// });

// reservas.hasOne(quartos, {
//     foreignKey: 'id_quarto'
// });

//  quartos.belongsTo(reservas, {
//     foreignKey: 'id_quarto'
//  });




// module.exports = reservas