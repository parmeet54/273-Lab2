//const db = require('../../config/db.config');
const mongoose = require('mongoose')

const Schema = mongoose.Schema;


// Item Schema
const ShopSchema = new Schema ({
    shop_ID:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    total_sales:{
        type: Number,
        default:0
    },
    image:{
        type: String,
        default:"/default-shop.jpeg"
    }
});

const ShopModel = mongoose.model('shop', ShopSchema);

module.exports = ShopModel;