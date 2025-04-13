require("dotenv").config();
import express from "express";
import fileRoutes from "./routes/fileRoutes";
import cors from "cors";
import path = require("path");
import { Request, Response, NextFunction } from "express";


  //MIDDLEWARE
  const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.setTimeout(10000); // 10 seconds
//   res.setTimeout(10000);
//   next();
// });


app.use((req, res, next) => {
  console.log(`Incoming ${req.method} to ${req.originalUrl}`);
  next();
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});


//ROUTE MOUNTING
// Ensure this comes AFTER express.json() and other middleware
app.use('/api/files', fileRoutes); // Your current setup

//static file serving
app.use('/upload', express.static(path.join(__dirname, 'uploads')));

  //error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
  });


  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });