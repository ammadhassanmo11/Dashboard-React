
// components/SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import './SignIn.css';
const API_URL = 'http://localhost:5000'
const SignIn = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
const handleSignIn = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Authentication failed');
      }
  
      // Authentication successful, get user name from userData and navigate to Dashboard
      const userName = userData.username; // Change 'name' to the actual property name in your userData
      console.log('User Name:', userName);
      navigate('/dashboard', { state: { userName } });
    } catch (error) {
      console.error('Error during authentication:', error.message);
      setError(error.message || 'An error occurred during authentication. Please try again.');
    }
  };
  return (
    <div className="sign-in-page">
      <h1 className="sign-in-header">Sign In</h1>
      {error && <p className="error-message">{error}</p>}
      <LoginForm onSignIn={handleSignIn} />
    </div>
  );
};

export default SignIn;
