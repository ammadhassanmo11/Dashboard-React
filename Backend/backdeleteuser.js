// backDeleteUser.js

const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const { pool } = require('./db');

const router = express.Router();
router.use(bodyParser.json());

router.get('/checkUser/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT TOP 1 * FROM Workers WHERE id = @id');
  
      const exists = result.recordset.length > 0;
      res.json({ exists });
    } catch (error) {
      console.error('Error checking user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const checkResult = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT TOP 1 * FROM Workers WHERE id = @id');
  
      if (checkResult.recordset.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Workers WHERE id = @id');
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
