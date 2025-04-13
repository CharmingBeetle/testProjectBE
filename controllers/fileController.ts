import { Request, Response } from 'express';
import { extractTextFromPdf } from '../services/pdfParse';
import { insertFileData } from '../models/fileModel';
import { PDFDocument } from '../types/pdfTypes';

export const uploadAndProcessPDF = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Validate file exists
if (!req.file) {
     res.status(400).json({ error: 'No PDF uploaded' });
     return;
  }

  try {
  const doc:PDFDocument = {
      originalName:req.file.originalname,
      filePath:'[in-memory]', // No file path needed (in-memory)
      extractedText:await extractTextFromPdf(req.file.buffer),
      fileUrl:`/uploads/${req.file.filename}`, // Assuming this is the URL path
 // Use filename as ID
      isProcessed: true
  };

  await insertFileData(doc);
  res.json({success: true, message: 'PDF processed and saved successfully', data: doc })
  .end();

  } catch (error) {
    console.error('Processing error:', error);
     res.status(500).json({
      error: error instanceof Error ? error.message : 'PDF processing failed'
    });
  }
};