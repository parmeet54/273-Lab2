const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Item Schema
const ItemSchema = new Schema ({
    item_ID:{
        type: Number,
        required: true,
        unique: true
    },
    shop:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    fav:{
        type: Buffer,
        default:0
    },
    shopname:{
        type: String
    },
    image:{
        type: String,
        default:"/default-item.jpeg"
    }

});


const ItemModel = mongoose.model('item', ItemSchema);

module.exports = ItemModel;