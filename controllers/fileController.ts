import { Request, Response } from 'express';
import { extractTextFromPdf } from '../services/pdfParse';
import { insertFileData } from '../models/fileModel';
import { PDFDocument } from '../types/pdfTypes';
import { getConnection } from '../utils/db';
import { Connection } from 'mysql2/promise';

export const uploadAndProcessPDF = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // Validate file exists
if (!req.file) {
     res.status(400).json({ error: 'No PDF uploaded' });
     return;
  }
  let dbConnection: Connection | null = null;
  try {
    dbConnection = await getConnection();
    const result: { text: string; metadata?: Record<string, any> } = await extractTextFromPdf(req.file.buffer);
    const text = result.text;
    const metadata = result.metadata || {};

  const doc:PDFDocument = {
      originalName:req.file.originalname,
      filePath:'[in-memory]', // No file path needed (in-memory)
      extractedText:text,
      fileUrl:`/uploads/${req.file.filename}`, // Assuming this is the URL path
      isProcessed: true, 
      ...metadata
  };

  await insertFileData(doc);
  res.json({success: true, message: 'PDF processed and saved successfully', metadata: {
    title: doc.title,
    author: doc.author,
    pageCount: doc.pageCount
  } })
  .end();

  } catch (error) {
    console.error('Processing error:', error);
     res.status(500).json({
      error: error instanceof Error ? error.message : 'PDF processing failed'
    });
  } finally {
    if (dbConnection) {
      if ('release' in dbConnection) {
        if (typeof dbConnection.release === 'function') {
          dbConnection.release();
        }
      }
    }
  }
  }
