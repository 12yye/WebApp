import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple validation for demo purposes
        if (username && password) {
            if (username.startsWith('tenant')) {
                navigate('/tenant-dashboard');
            } else if (username.startsWith('staff')) {
                navigate('/staff-dashboard');
            } else if (username.startsWith('manager')) {
                navigate('/manager-dashboard');
            } else {
                alert('Invalid credentials! Please try again.');
            }
        } else {
            alert('Please enter both username and password.');
        }
    };

    return (
        <div className="login-container">
            <h2>Maintenance System</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
