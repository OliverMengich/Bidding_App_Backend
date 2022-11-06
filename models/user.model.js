const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
},{
    timestamps: true
});

module.exports = Users;