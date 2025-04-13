// utils/db.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { connect } from 'http2';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "test_db",
  password: process.env.DB_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
export const getConnection = async (): Promise<mysql.PoolConnection> => {
    return await pool.getConnection();
  };
