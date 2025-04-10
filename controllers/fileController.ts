import { Request, Response } from 'express';
import { uploadToS3v2 } from '../services/s3Service';
import extractTextFromPdf from '../services/'; // Ensure the file name matches the actual file
import { insertFileData } from '../models/fileModel';

 const uploadFileAndStore = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Step 1: Upload file to AWS S3 (**change version if needed**)
    const fileUrl = await uploadToS3v2(req.file);

    // Step 2: Extract text from PDF
    const text = await extractTextFromPdf(req.file.buffer);

    // Step 3: Insert data into MySQL
    await insertFileData(fileUrl, text);

    res.status(200).send({ message: 'File uploaded and data saved successfully', fileUrl });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export default uploadFileAndStore;