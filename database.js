const Sequelize = require('sequelize')

const user = 'YOUR_USER_NAME'
const password = 'YOUR_PASSWORD'
const host = 'localhost'
const database = 'YOUR_DATABASE_NAME'

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: 'postgres',
    logging: false
}) 

module.exports = sequelize