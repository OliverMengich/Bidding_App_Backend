const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/db.sqlite',
    logging: false
});
sequelize.authenticate().then(()=>console.log("Connected to database"));
module.exports = sequelize;