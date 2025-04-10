import express from 'express';
import { uploadToS3v2 } from '../services/s3Service';
import {uploadAndProcessPDF} from '../controllers/fileController';


const router = express.Router();
router.post('/upload', uploadToS3v2, uploadAndProcessPDF);

export default router;
