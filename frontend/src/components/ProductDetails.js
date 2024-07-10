import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = cart.find(item => item._id === product._id);

        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/cart');
    };

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {[...Array(10).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
            </select>
            <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
    );
}

export default ProductDetails;
