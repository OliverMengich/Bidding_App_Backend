const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const Bid = sequelize.define('bids', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    user: {
        type: DataTypes.UUIDV1,
        references: {
            model: 'User',
            key: 'id'
        },
        allowNull: false,
        unique: true
    },
    product: {
        type: DataTypes.UUID,
        references: {
            model: 'Product',
            key: 'id'
        },
        allowNull: false
    },
    bidPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: true
    },
    bidTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
},{
    timestamps: true
}
);
module.exports = Bid;