const Sequelize = require("sequelize");

const sequelize = new Sequelize('pousada', 'root', 'root', { 
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
});
// parametros: usuario, username, senha, objeto contendo host e dialect

module.exports = sequelize;