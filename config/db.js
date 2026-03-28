import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blog_api',
};  

export const initializeDatabase = async () => {
  const connection = await mysql.createConnection(dbConfig);
  console.log('Connected to the MySQL database.');
  return connection;
};

export const getDBConnection = async () => {
  return mysql.createConnection(dbConfig);
};

export default dbConfig;

