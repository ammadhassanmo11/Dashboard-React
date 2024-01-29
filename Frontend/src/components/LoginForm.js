

// components/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Authentication successful
        // Store the username in localStorage
        localStorage.setItem('username', data.user.username);

        // Call the onSignIn callback with the user data
        onSignIn(data.user);
      } else {
        // Authentication failed
        alert(data.error);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      alert('An error occurred during sign-in. Please try again.');
    }
  };

  return (
    <div className="login-form-container">
      <label className="form-label">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
      </label>
      <br />
      <label className="form-label">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
      </label>
      <br />
      <button onClick={handleSignIn} className="form-button">
        Sign In
      </button>
    </div>
  );
};

export default LoginForm;
