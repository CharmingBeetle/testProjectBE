export interface PDFDocument {
    documentId?: number; // Optional, for database-generated ID
    originalName: string;
    filePath: string;
    extractedText: string;
    fileUrl: string;
    isProcessed: boolean;
    title?: string;
    author?: string;
    keywords?: string;
    pageCount?: number;
    creator?: string;
  }
  
//  * Represents a PDF document in the system
//  * @property {number} [id] - Database-generated ID
//  * @property {string} originalName - Original uploaded filename
//  * @property {string} filePath - System path to stored file
//  * @property {string} extractedText - Text content extracted from PDF
//  * @property {string} fileUrl - URL to access the PDF

// For API responses
export type PDFDocumentResponse = PDFDocument & {
    textPreview?: string;
  };
  
  // For creation payloads
  export type CreatePDFDocument = Omit<PDFDocument, 'id'|'createdAt'>;