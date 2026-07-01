
const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

function createPool() {
  if (process.env.MYSQL_URL) {
    // Railway menyediakan connection string lengkap: mysql://user:pass@host:port/db
    return mysql.createPool(process.env.MYSQL_URL + '?ssl-mode=DISABLED');
  }

  // Fallback: variabel individual (baik dari Railway maupun .env lokal)
  return mysql.createPool({
    host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
    port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
    user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
    password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'daily_inspiration',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

pool = createPool();

module.exports = pool;
