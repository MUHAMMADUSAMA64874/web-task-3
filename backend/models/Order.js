const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    }],
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
    paymentMethod: String,
    paymentResult: { id: String, status: String, update_time: String, email_address: String },
    taxPrice: { type: Number, default: 0.0 },
    shippingPrice: { type: Number, default: 0.0 },
    totalPrice: { type: Number, default: 0.0 },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);