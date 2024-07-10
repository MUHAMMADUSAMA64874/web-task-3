import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const proceedToCheckout = () => {
        navigate('/checkout');
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? <p>Cart is empty</p> : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item._id}>
                            <img src={item.image} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>Category: {item.category}</p>
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => removeFromCart(item._id)}>Remove</button>
                        </div>
                    ))}
                    <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                </div>
            )}
            <button onClick={proceedToCheckout}>Proceed to Checkout</button>
        </div>
    );
}

export default Cart;
