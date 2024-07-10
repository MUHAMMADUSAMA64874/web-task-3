import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/api/users/login', {
                email,
                password,
            });
            localStorage.setItem('userInfo', JSON.stringify(data));
            setMessage('Successfully logged in!');
            setIsError(false);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
            setIsError(true);
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            {message && (
                <p style={{ color: isError ? 'red' : 'green' }}>
                    {message}
                </p>
            )}
            <form onSubmit={submitHandler}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
