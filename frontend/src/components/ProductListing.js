import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ProductListing() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/category/${category}`);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [category]);

    const addToCartHandler = (product) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = cart.find(item => item._id === product._id);

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <div>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <div className="products">
                {products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <Link to={`/product/${product._id}`}>
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>Category: {product.category}</p>
                                <p>Price: ${product.price}</p>
                            </Link>
                            <button onClick={() => addToCartHandler(product)}>Add to Cart</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProductListing;
