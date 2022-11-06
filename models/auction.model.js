const sequelize = require('../database/db');
const { DataTypes } = require('sequelize');
const Product = require('./product.model.js');
const Bid = require('./bid.model');
const User = require('./user.model.js');
const Auction = sequelize.define('Auctions', {
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    product: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    },
    bids: {
        type: DataTypes.ARRAY,
        references: {
            model: 'Bid',
            key: 'id'
        },
        allowNull: false
    },
    auctionStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    creator: {
        type: DataTypes.UUIDV1,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    auctionWinner: {
        type: DataTypes.UUIDV1,
        allowNull: false,
    },
    auctionStartTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    auctionEndTime: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    auctionStartPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    auctionCurrentPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    auctionIncrement: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    auctionIncrementTime:{
        type: DataTypes.TIME,
        defaultValue: '',
        allowNull: false
    },
    auctionIncrementPrice:{
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false
    }
},{
    timestamps: true
});
//One to one relation between Auction and Product
Auction.hasOne(Product,{
    foreignKey:{
        name: 'product',
        allowNull: false
    }
});
Product.belongsTo(Auction);
//One to many relation with Auction and Bids
Auction.hasMany(Bid,{
    foreignKey: {
        name:'bids',
        allowNull: false
    }
});
Bid.belongsTo(Auction);

// One to many relation between User and Auctions
//A user can have many auctions. But an A

User.hasMany(Auction);
Auction.belongsTo(User,{
    foreignKey:{
        name: 'creator',
        allowNull: false
    }
});
module.exports = Auction;
