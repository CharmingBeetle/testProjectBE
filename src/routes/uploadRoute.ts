import express, { Request, Response } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// DB connection (ideally move to separate file)
const db = await mysql.createConnection({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

router.post('/upload', upload.single('pdf'), async (req: Request, res: Response) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded.');

    const filePath = path.resolve(req.file.path);
    const fileBuffer = fs.readFileSync(filePath);

    const parsed = await pdfParse(fileBuffer);
    const extractedText = parsed.text;

    await db.execute(
      'INSERT INTO files (file_name, file_data, text_content) VALUES (?, ?, ?)',
      [req.file.originalname, fileBuffer, extractedText]
    );

    fs.unlinkSync(filePath); // Clean up temp file
    res.status(200).send('PDF uploaded and data saved.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong.');
  }
});

export default router;
