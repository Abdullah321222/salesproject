const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    created_at: Date,
    default_address: {
        city: String
    }
});

const Customer = mongoose.model('shopifyCustomer', customerSchema);

module.exports = Customer
