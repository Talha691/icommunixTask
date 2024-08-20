
const { Sequelize } = require('sequelize');
require('dotenv').config();

const host = process.env.database_host;
const user = process.env.database_user;
const password = process.env.database_password;
const database = process.env.database;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
});

async function con() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = { con, sequelize}
