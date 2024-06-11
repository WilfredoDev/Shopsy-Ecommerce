const mongoose = require('mongoose');

const customerchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    lastname: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    userId: {
        type: String,
        required: true,
        unique:true
    },
    phoneNumber: String,
    address: String,
    dni: String
}, {timestamps: true});
const Customer = mongoose.model('Customer', customerchema);

module.exports = Customer

