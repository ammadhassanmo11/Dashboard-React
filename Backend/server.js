

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { authenticateUser } = require('./index');
const sql = require('mssql');
const { pool } = require('./db');
const { useState } = require('react');
const { useHistory } = require('react-router-dom');
const backDeleteUserRouter = require('./backdeleteuser');
const checkFirstNameRouter = require('./backnameauth');
const backenddataupdate = require('./backupdatedata');
const backendRegistration = require('./backregistration');



const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../signin/build')));

// Create Person table if not exists
const createPersonTable = async () => {
  try {
    // Open a new connection before executing the query
    const poolRequest = await pool.connect();
    
    await poolRequest.query(`
      IF OBJECT_ID('Workers', 'U') IS NULL
      CREATE TABLE Workers (
        id INT IDENTITY(1,1) PRIMARY KEY,
        firstname NVARCHAR(255),
        lastname NVARCHAR(255),
        email NVARCHAR(20),
        cnic NVARCHAR(255),
        contact NVARCHAR(255),
        address NVARCHAR(10)
      )
    `);

    // Close the connection after executing the query

  } catch (error) {
    console.error('Error creating table:', error);
  }
};

// Call the function to create the Person table
createPersonTable();

// Rest of your code...

// Insert data into the table
app.post('/addData', async (req, res) => {
  try {
    const { firstName, lastName, email, cnic, contact, address } = req.body;

    const result = await pool.request()
      .input('firstName', sql.NVarChar, firstName)
      .input('lastName', sql.NVarChar, lastName)
      .input('email', sql.NVarChar, email)
      .input('cnic', sql.NVarChar, cnic)
      .input('contact', sql.NVarChar, contact)
      .input('address', sql.NVarChar, address)
      .query('INSERT INTO Workers (firstname, lastname, email, cnic, contact, address) VALUES (@firstName, @lastName, @email, @cnic, @contact, @address)');

    console.log('Data inserted Workers table successfully');
    // Inside your server.js, after successful data insertion
    return res.json({ success: true, redirect: '/dashboard' });

    // return res.json({ success: true });
  } catch (error) {
    console.error('Error inserting data into Workers table:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/', backDeleteUserRouter);
app.use('/backnameauth', checkFirstNameRouter);
app.use('/backupdatedata', backenddataupdate);
app.use('/backregistration', backendRegistration);

// Authentication logic
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Open a new connection before executing the authentication query
    const poolRequest = await pool.connect();
    
    authenticateUser(username, password, (err, user) => {
      // Close the connection after the authentication query is executed

      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (user) {
        // User authenticated
        return res.json({ success: true, user });
      } else {
        // Authentication failed
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  } catch (error) {
    console.error('Error handling /api/login request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Handle React routing, return all requests to React app
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../signin/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
