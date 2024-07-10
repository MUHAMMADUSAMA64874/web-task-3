import React, { useState } from 'react';
import axios from 'axios';

function Checkout() {
    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [message, setMessage] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            await axios.post('http://localhost:5000/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod
            });
            setMessage('Order placed successfully!');
            localStorage.removeItem('cart');
        } catch (error) {
            setMessage('Error placing order');
        }
    };

    return (
        <div>
            {message && <p>{message}</p>}
            <h1>Checkout</h1>
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder="Shipping Address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                />
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <option value="PayPal">PayPal</option>
                    <option value="Stripe">Stripe</option>
                </select>
                <button type="submit">Place Order</button>
            </form>
        </div>
    );
}

export default Checkout;
