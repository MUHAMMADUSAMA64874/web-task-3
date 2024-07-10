import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import ProductListing from './components/ProductListing';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import UserDashboard from './components/UserDashboard';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/products/:category" element={<ProductListing />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
        </Router>
    );
}

export default App;
