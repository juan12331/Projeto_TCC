const Sequelize = require("sequelize");

const pousada = process.env.SQL_DATABASE;
const host = process.env.SQL_HOST;
const senha =  process.env.SQL_PASSWORD;
const username = process.env.SQL_USERNAME;
const port = process.env.PORT;

const sequelize = new Sequelize(pousada, username, senha, { 
    host: host,
    dialect: 'mysql',
    port: port
});
// parametros: usuario, username, senha, objeto contendo host e dialect

module.exports = sequelize;