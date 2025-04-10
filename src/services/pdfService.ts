// /src/services/pdfService.ts
import pdfParse from 'pdf-parse';
import AWS from 'aws-sdk';
import fs from 'fs';
import { S3 } from 'aws-sdk';


// Assuming you have the path to the uploaded file
const extractTextFromPDF = async (filePath: string): Promise<string> => {
  const fileBuffer = fs.readFileSync(filePath); // Read the PDF file
  const data = await pdfParse(fileBuffer);      // Extract text
  return data.text;                             // Return the extracted text
};
