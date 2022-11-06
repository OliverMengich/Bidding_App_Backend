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
    category: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    creator: {
        type: DataTypes.UUIDV4, // should be a user,
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    regularPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    auctionPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    auctionStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    auctionStartTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    auctionEndTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    timestamps: true
}
);
module.exports = Product;