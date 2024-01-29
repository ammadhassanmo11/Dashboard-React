import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NameAuth = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [message, setMessage] = useState('');

  const handleNext = async () => {
    try {
      // Check if the entered first name exists
      const response = await fetch(`http://localhost:5000/backnameauth/${firstName}`);
      const data = await response.json();

      if (data.exists) {
        // If the first name exists, set a message and redirect after a delay
        setMessage('User exists. Redirecting to update screen...');
        setTimeout(() => {
          // Pass the firstName parameter in the URL when navigating
          navigate(`/updatedata/${encodeURIComponent(firstName)}`);
        }, 2000); // Redirect after 2 seconds (adjust as needed)
      } else {
        // If the first name doesn't exist, show a message
        setMessage('User with the provided first name does not exist. Please enter a valid first name.');
      }
    } catch (error) {
      console.error('Error checking first name:', error.message);
      alert('An error occurred while checking the first name.');
    }
  };

  return (
    <div>
      <h3>Enter First Name</h3>
      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <button onClick={handleNext}>Next</button>
      <p>{message}</p>
    </div>
  );
};

export default NameAuth;
