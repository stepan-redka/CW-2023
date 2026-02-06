const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'KursovaDB',
  port: process.env.DB_PORT || 3306
});

const connectDB = () => {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error('Database connection error:', err.message);
        reject(err);
      } else {
        console.log('Connected to the database');
        resolve(db);
      }
    });
  });
};

module.exports = { db, connectDB };
