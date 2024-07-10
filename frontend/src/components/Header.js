import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Sign Up</Link>
            </nav>
        </header>
    );
}

export default Header;
