
/// Model/db.js
const sql = require('mssql');

// Database configuration
const config = {
  user: 'sa',
  password: 'Ncljo1234',
  server: 'CW-AMMAD-IT',
  database: 'Dummydatabase', // Note: Change this to your actual database
  options: {
    encrypt: true,
    trustServerCertificate: true,
    trustedConnection: true,
    enableArithAbort: true,
    connectTimeout: 15000,
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect.then(() => {
  console.log('Connected to MSSQL');
}).catch(err => {
  console.error('Error connecting to MSSQL:', err);
});

module.exports = {
  pool: pool,
  sql: sql
};
