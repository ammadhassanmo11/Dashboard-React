
// DeleteUser.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './deleteuser.css';

// ... (other imports and code)

const DeleteUser = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
  
    const handleDelete = async () => {
      try {
        // Check if the ID exists (replace with your API endpoint)
        const response = await fetch(`http://localhost:5000/checkUser/${userId}`);
        const data = await response.json();
  
        if (data.exists) {
          // If the ID exists, proceed with deletion
          const deleteResponse = await fetch(`http://localhost:5000/deleteUser/${userId}`, {
            method: 'DELETE',
          });
  
          if (deleteResponse.ok) {
            setMessage('User deleted successfully');
  
            // Automatically redirect to the dashboard after 3 seconds
            setTimeout(() => {
              navigate('/dashboard');
            }, 1000);
          } else {
            const errorData = await deleteResponse.text();
            setMessage(`Error deleting user: ${errorData}`);
          }
        } else {
          // If the ID doesn't exist, show a message
          setMessage('User with the provided ID does not exist. Please enter a valid ID.');
        }
      } catch (error) {
        console.error('Error deleting user:', error.message);
        setMessage('An error occurred while deleting the user.');
      }
    };
  
    return (
      <div className="delete-user-container">
        <h3>Delete User</h3>
        <label htmlFor="userId">Enter User ID:</label>
        <input type="text" id="userId" name="userId" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <button onClick={handleDelete}>Delete User</button>
        {message && <p>{message}</p>}
      </div>
    );
  };
  
  export default DeleteUser;
  