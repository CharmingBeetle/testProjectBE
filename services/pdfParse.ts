import pdf from 'pdf-parse';
import path from 'path';
import { PDFDocument } from '../types/pdfTypes';
import fileUpload from 'express-fileupload';


export const extractTextFromPdf = async (buffer: Buffer): Promise<{ text: string; metadata?: Record<string, any> }> => {
  const { text, metadata } = await pdf(buffer);
  return {
    text,  
    metadata: {
    title: metadata?.Title || null,
    author: metadata?.Author || null,
    keywords: metadata?.Keywords || null,
    pageCount: metadata?.pdf?.numPages || 1,
    creator: metadata?.Creator || null
  }
};
}

