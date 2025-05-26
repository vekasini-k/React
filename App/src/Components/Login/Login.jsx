import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.includes('@')) {
    setError('Invalid email format');
    return;
  }
  if (password.trim() === '') {
    setError('Password cannot be empty');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/auth/login', {
      email,
      password,
    });

    const { token } = response.data;

    // Store token in localStorage or cookies
    localStorage.setItem('token', token);

    // Navigate to home page
    navigate('/home');
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <center>
            <h1>Welcome</h1>
        </center>
        <h2>Username</h2>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <h2>Password</h2>
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
