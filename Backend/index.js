
// Model/index.js
const { pool, sql } = require('./db');

const authenticateUser = (username, password, callback) => {
  const request = new sql.Request(pool);
  request.input('username', sql.VarChar, username);
  request.input('password', sql.VarChar, password);
  request.query('SELECT * FROM Users WHERE username = @username AND password = @password', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }

    if (result.recordset.length > 0) {
      // User found, return user data
      return callback(null, result.recordset[0]);
    } else {
      // User not found
      return callback(null, null);
    }
  });
};

module.exports = { authenticateUser };

