import { Connection } from 'mysql2/promise';
import  { getConnection } from '../utils/db';
import { PDFDocument } from '../types/pdfTypes';


export const insertFileData = async (
  doc:PDFDocument
): Promise<void> => {
  let dbConnection: Connection | null = null;
  
  try {
    dbConnection = await getConnection();
  
    if (!dbConnection) {
      throw new Error('Database connection failed');
    }

  const [result] = await dbConnection.execute(
      `INSERT INTO pdf_documents 
       (original_name, file_path, extracted_text, file_url, is_processed, title, author, keywords, page_count, creator)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        doc.originalName,
        doc.filePath || '[in-memory]', // Handle empty path case
        doc.extractedText,
        doc.fileUrl || '', // Ensure non-null
        doc.isProcessed ? 1 : 0, // Convert boolean to MySQL tinyint
        doc.title,
        doc.author,
        doc.keywords,
        doc.pageCount,
        doc.creator
      ]
    );
    console.log('Insert successful. Rows affected:', 
      'insertId' in result ? result.insertId : 0);

  } catch (error) {
    console.error('Database insertion error:', error);
    throw new Error('Failed to insert PDF data');

  } finally {
    if (dbConnection) {
      if ('release' in dbConnection) {
        if (typeof dbConnection.release === 'function') {
          dbConnection.release();
        }
      }
    }
  }
};
