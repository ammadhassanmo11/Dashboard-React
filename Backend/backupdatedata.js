
// backupdatedata.js
const express = require('express');
const router = express.Router();
const { pool } = require('./db');
const sql = require('mssql');

router.put('/:firstName', async (req, res) => {
  const { firstName } = req.params;
  const { lastName, email, cnic, contact, address } = req.body;

  try {
    const result = await pool.request()
      .input('firstName', sql.NVarChar, firstName)
      .input('lastName', sql.NVarChar, lastName)
      .input('email', sql.NVarChar, email)
      .input('cnic', sql.NVarChar, cnic)
      .input('contact', sql.NVarChar, contact)
      .input('address', sql.NVarChar, address)
      .query(`
        UPDATE Workers
        SET lastName = @lastName,
            email = @email,
            cnic = @cnic,
            contact = @contact,
            address = @address
        WHERE firstName = @firstName
      `);

    if (result.rowsAffected[0] > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.json({ success: true, message: 'User data updated successfully.' });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
