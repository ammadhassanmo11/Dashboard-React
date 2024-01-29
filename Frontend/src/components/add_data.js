
import React, { useState, useEffect } from 'react';
import './add_data.css';
import { useNavigate } from 'react-router-dom';

const AddData = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cnic: '',
    contact: '',
    address: ''
  });
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (successMessage) {
      const timeoutId = setTimeout(() => {
        setSuccessMessage('');
        navigate('/dashboard'); // Redirect to the dashboard after a short delay
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [successMessage, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/addData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage('Data inserted successfully');
      } else {
        const errorData = await response.text(); // Change here to text() instead of json()
        setError(`Error inserting data: ${errorData}`);
      }
    } catch (error) {
      setError(`Error inserting data: ${error.message}`);
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
      <h3 className="add-data-header">Enter User Data</h3>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="cnic">CNIC:</label>
          <input type="text" id="cnic" name="cnic" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input type="tel" id="contact" name="contact" required onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea id="address" name="address" required onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddData;
