const mongoose = require('mongoose')

const Schema = mongoose.Schema;


// Order Schema
const OrderSchema = new Schema ({
    order_ID:{
        type: Number,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true
    },
    items:{
        type:Array,
        required: true
    },
    date_purc:{
        type: String,
        required: true
    },
    total:{
        type:Number,
        required: true
    }
});

const OrderModel = mongoose.model('order', OrderSchema);

module.exports = OrderModel;