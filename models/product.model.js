const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const Product = sequelize.define('Products', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    
},{
    timestamps: true
}
);
module.exports = Product;