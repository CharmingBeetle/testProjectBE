// /src/routes/uploadRoute.ts
import express, { Request, Response } from 'express';
import multer from 'multer'; // Multer for file upload
import { uploadToS3 } from '../services/s3Service'; // Function to upload to S3
import { extractTextFromPdf, extractTextWithTextract } from '../services/pdfService'; // Text extraction
import { insertTextToDb } from '../services/dbService'; // DB insertion

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Files are stored in memory (no disk write)
const upload = multer({ storage: storage }).single('pdf'); // Expect a file field named 'pdf'

// POST route for uploading PDF
router.post('/upload', upload, async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const bucketName = 'pdftexts'; // Your S3 bucket name
  const fileName = req.file.originalname; // Use the original file name or create a unique name
  const fileBuffer = req.file.buffer; // Multer stores the file as a buffer in memory

  try {
    // Step 1: Upload PDF to S3
    await uploadToS3(fileBuffer, bucketName, fileName);

    // Step 2: Extract text from the PDF (use Textract or local pdf-parse)
    const text = await extractTextWithTextract(bucketName, fileName);  // Or extractTextFromPdf()

    // Step 3: Insert extracted text into the DB
    await insertTextToDb(fileName, text);

    res.status(200).send("File uploaded and processed successfully.");
  } catch (error) {
    res.status(500).send("Error processing file: " + error.message);
  }
});

export default router;
