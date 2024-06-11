const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
    },
    productId:{
        type:String,
        required:true,
    },
    amount:{
        type: Number,
        required:true,
    },
}, {timestamps:true}, {collection:'orderProducts'});

const OrderProduct = mongoose.model('orderProduct', orderProductSchema);

module.exports = OrderProduct