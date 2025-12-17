const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'PKR'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vendor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    reviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
});

module.exports = Product;
