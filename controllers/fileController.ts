import { Request, Response, NextFunction } from 'express';
import { uploadToS3v2 } from '../services/s3Service';
import {extractTextFromPdf} from '../services/pdfParse'; // Ensure the file name matches the actual file
import { insertFileData } from '../models/fileModel';
import dotenv from 'dotenv';
dotenv.config();

 export const uploadAndProcessPDF = async (req: Request, res: Response, next:NextFunction):Promise<void> => {
    
  try {
    const file = req.file as Express.Multer.File; // Ensure the file is of type Express.Multer.File
    if (!file) {
       res.status(400).send('No file uploaded');
    }

    // Step 1: Upload file to AWS S3 (**change version if needed**)
    const fileUrl = await uploadToS3v2(req.file);

    // Step 2: Extract text from PDF
    const text = await extractTextFromPdf(file.buffer);
    console.log(text); // Log the extracted text for debugging

    // Step 3: Insert data into MySQL
    await insertFileData(fileUrl, text);

    res.status(200).send({ message: 'File uploaded and data saved successfully', fileUrl });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
