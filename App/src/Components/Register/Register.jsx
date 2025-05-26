import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.includes('@')) {
      setError('Invalid email format');
      return;
    }

    if (formData.password.trim() === '') {
      setError('Password cannot be empty');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert('Registration successful!');
      navigate('/'); // Redirect to login
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='File'>
      <div className='register-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <h2>Full Name</h2>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', marginBottom: '10px' }}
            required
          />

          <h2>Email</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', marginBottom: '10px' }}
            required
          />

          <h2>Password</h2>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', marginBottom: '10px' }}
            required
          />

          {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

          <button type="submit" style={{ width: '100%' }}>Register</button>

          <p className="register-link">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
