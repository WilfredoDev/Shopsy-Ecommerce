const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true
    },
    description:{
        type: String,
        required:true,
        max:255
    },
    price:{
        type: Number,
        required:true
    },
    categoryId:{
        type: String,
        required: true,
    },
    stock:{
        required:true,
        type:Number
    },
    imageUrl: {
        type: String,
        default: ''
    }
}, {timestamps:true}, {collection:'products'});

const Product = mongoose.model('Product', productSchema);

module.exports = Product