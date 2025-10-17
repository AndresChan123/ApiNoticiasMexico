const Sequelize = require('sequelize');
require('dotenv').config();
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } = require('./config.js');

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mariadb' // <-- ESTE ES EL CAMBIO
});

connection.authenticate()
    .then(() => {
        console.log('Se ha establecido conexión con la base de datos ✅');
    })
    .catch(err => {
        console.error('No se pudo establecer conexión con la base de datos:', err);
    });

module.exports = { connection };