

// UpdateData.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateData = () => {
  const navigate = useNavigate();
  const { firstName } = useParams();

  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Set the lastName value when the component mounts
    setLastName('');
  }, [firstName]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/backupdatedata/${firstName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lastName,
          email,
          cnic,
          contact,
          address,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Handle success, show success message and redirect to dashboard after a delay
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500); // Redirect after 2 seconds (adjust as needed)
      } else {
        // Handle error, show an error message
        console.error('Some issues has been prevailed in the app:', data.error);
        setErrorMessage('Some Issues are causing application to Hault.');
      }
    } catch (error) {
      console.error('Some problem is caused while updating user data:', error);
      setErrorMessage(`Some Issue prevailed while Updating the data of ${firstName}`);
    }
  };

  return (
    <div>
      <h3>Update User Data</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={firstName} readOnly />

        <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />


        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="cnic">CNIC:</label>
        <input type="text" id="cnic" name="cnic" value={cnic} onChange={(e) => setCnic(e.target.value)} />

        <label htmlFor="contact">Contact:</label>
        <input type="text" id="contact" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} />

        <label htmlFor="address">Address:</label>
        <textarea id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button type="submit">Update Data</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default UpdateData;
