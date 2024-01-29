const express = require('express');
const router = express.Router();
const { pool } = require('./db');
const sql = require('mssql');

// Check if the entered first name exists in the database
router.get('/:firstName', async (req, res) => {
  const { firstName } = req.params;

  try {
    const result = await pool.request()
      .input('firstName', sql.NVarChar, firstName)
      .query('SELECT COUNT(*) AS count FROM Workers WHERE firstName = @firstName');

    const exists = result.recordset[0].count > 0;
    res.json({ exists });
  } catch (error) {
    console.error('Error checking first name:', error);

    // Return a JSON response even in case of an error
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

