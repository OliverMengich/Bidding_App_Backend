const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const User = sequelize.define('Users', {
    id: {
        type: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true
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
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nonce: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
},{
    timestamps: true
});

module.exports = User;