import express from 'express';
import cors from 'cors'; // CORS middleware
import uploadRoute from './src/routes/uploadRoute';

const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // To parse JSON bodies

app.use('/api', uploadRoute);  // Attach the upload route

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
