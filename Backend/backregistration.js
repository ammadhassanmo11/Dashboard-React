
// backregistration.js
const express = require('express');
const router = express.Router();
const { pool } = require('./db');
const sql = require('mssql');

router.post('/registeradmin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const usernameCheckResult = await pool.request()
      .input('username', sql.NVarChar, username)
      .query('SELECT TOP 1 1 FROM users WHERE username = @username');

    if (usernameCheckResult.rowsAffected[0] > 0) {
      // Username already exists, send an error response
      return res.status(400).json({ error: 'Username already exists. Please choose another username.' });
    }

    // If username doesn't exist, proceed with the registration
    const insertResult = await pool.request()
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, password)
      .query('INSERT INTO users (username, password) VALUES (@username, @password)');

    console.log('Data inserted into users table successfully');
    return res.json({ success: true, redirect: '/dashboard' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

