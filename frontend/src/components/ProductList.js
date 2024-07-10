// frontend/src/components/ProductListing.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductListing() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get(`/api/products?category=${category}`);
            setProducts(data);
        };
        fetchProducts();
    }, [category]);

    return (
        <div>
            <h1>{category}</h1>
            <div className="products">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductListing;
