import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('DB error:', err);
    return;
  }
  console.log('MySQL connected!');
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
