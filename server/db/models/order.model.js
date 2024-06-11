const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId:{
        type:String,
        required:true,
    },
}, {timestamps:true}, {collection:'orders'});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order