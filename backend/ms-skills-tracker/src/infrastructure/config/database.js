
require('dotenv').config();
const { Pool } = require('pg');

// Create a new PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
  } else {
    console.log('Connected to PostgreSQL database at:', res.rows[0].now);
  }
});

module.exports = pool;
