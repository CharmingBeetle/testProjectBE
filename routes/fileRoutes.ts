import express from 'express';
import  uploadFileAndStore  from '../controllers/fileController';
import { uploadToS3v2 } from '../services/s3Service';


const router = express.Router();
router.post('/upload', uploadToS3v2, uploadFileAndStore);

export default router;
