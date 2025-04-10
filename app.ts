require("dotenv").config();
import express from "express";
import multer from "multer";
const app = express();
app.use(express.json());
import { Request, Response, NextFunction } from "express";
import { uploadToS3v2 } from "./services/s3Service";
// import { uploadToS3v3 } from "./services/s3Service";
import fileRoutes from "./routes/fileRoutes";
app.use('/api/files', fileRoutes);
import { upload } from "./utils/upload";

//VERSION 2 - WITH URL IN BODY :)
app.post("/upload", upload.single("pdf_file"), async (req, res) => {
  const file = req.file;
  try {
    const result = await uploadToS3v2(file);
    console.log(result);
    res.json({ status: "success", result });
  } catch (error) {
    console.error(error);
  }
});

//MULTIUPLOAD
// app.post("/upload", multiUpload.array("pdf_file", 1), (req, res) => {
//   console.log(req.files);
//   res.json({status:"success"})
// });

//VERSION 3 - NO URL
// app.post("/upload", upload.single("pdf_file"), async (req, res) => {
//   const file = req.file;
//   try {

//   const result = await uploadToS3v3(file);
//   console.log(result);
//   res.json({ status: "success", result});

// } catch (error) {
//     console.error(error);
// }
// });

app.use((error: any, req: Request, res: Response, next: NextFunction): void => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      res.status(400).json({ message: "File limit exceeded" });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      res.status(400).json({ message: "File type not supported" });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      res
        .status(400)
        .json({ message: "File limit reached. One file per upload." });
    }
  }
  res.status(500).json({
    message: "Internal server error",
    error: error.message,
  });
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
