// frontend/src/components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserDashboard() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const { data } = await axios.get('/api/orders/myorders');
            setOrders(data);
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>My Orders</h1>
            <div className="orders">
                {orders.map((order) => (
                    <div key={order._id} className="order">
                        <h3>Order ID: {order._id}</h3>
                        <p>Order Total: ${order.totalPrice}</p>
                        <p>Order Status: {order.isDelivered ? 'Delivered' : 'Pending'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserDashboard;
