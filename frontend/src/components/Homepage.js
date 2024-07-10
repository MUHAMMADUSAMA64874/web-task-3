// frontend/src/components/Homepage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Homepage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Featured Products</h1>
            <div className="products">
                {products.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Homepage;
