const uuid = require("uuid").v4;
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";  



// LOCAL DISK STORAGE
// const storage = multer.diskStorage({destination:(req, file, cb) => {
//   cb(null, "uploads/");
// },
//     filename:(req, file, cb) => {
//       const{originalname} = file;
//       cb(null, `${uuid()}-${originalname}`);
//     }
// })

//MEMORY STORAGE AWS S3
const storage = multer.memoryStorage(); // Store file in memory

  function fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
    }
  }

//SINGLE FILE UPLOAD
export const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024, files: 1 }, // 1MB limit
}); // destination folder dest: "/assests/uploads/"


// //muliple file upload
// export const multiUpload = multer({dest:"uploads/"});



