const mongoose = require('mongoose')

const Schema = mongoose.Schema;


// Shop Schema
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
        type: Number
        },
    image:{
        type: String
        }
});

const ShopModel = mongoose.model('shop', ShopSchema);

module.exports = ShopModel;