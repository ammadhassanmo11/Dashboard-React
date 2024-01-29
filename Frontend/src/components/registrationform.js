
// RegistrationForm.js
import React, { useState } from 'react';
import './registrationform.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/backregistration/registeradmin', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});


      if (response.ok) {
        setSuccessMessage('User registered successfully. Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000); // Redirect after 2 seconds (adjust as needed)
      } else {
        const errorData = await response.text(); // Change here to text() instead of json()
        setError(`Error registering user: ${errorData}`);
      }
    } catch (error) {
      setError(`Error registering user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="add-data-container">
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={registerUser}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="./SignIn">sign in?</a>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
