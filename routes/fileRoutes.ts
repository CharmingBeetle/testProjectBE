import express from 'express';
import { upload } from '../utils/upload';
import { uploadAndProcessPDF } from '../controllers/fileController';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { getConnection } from '../utils/db';

// Debug route - TEST THIS FIRST
// router.get('/live-check', (req, res) => {
//     console.log('Route accessed successfully');
//     res.json({ status: "Alive", timestamp: new Date() });
//   });


// Strongly typed route handlers
router.post(
  '/upload',
  upload.single('pdf_file'),
  
  (req: express.Request, res: express.Response, next: express.NextFunction)=> {
    if (!req.file) {
       res.status(400).json({ error: 'No file uploaded' });
       ;
    }
    uploadAndProcessPDF(req, res).catch(next);
  }
);

// In fileRoutes.ts
// router.get('/test-connection', (req, res) => {
//     res.json({ message: "Route is working!" });
//   });

// Add to your routes.ts
router.get('/search', async (req: Request, res: Response) => {
  const { q } = req.query;
  const dbConnection = await getConnection();
  
  const [results] = await dbConnection.query(
    `SELECT id, original_name, 
     MATCH(extracted_text) AGAINST(? IN NATURAL LANGUAGE MODE) AS score
     FROM pdf_documents 
     WHERE MATCH(extracted_text) AGAINST(? IN NATURAL LANGUAGE MODE) > 0
     ORDER BY score DESC`,
    [q, q]
  );

  dbConnection.release();
  res.json(results);
});



export default router;