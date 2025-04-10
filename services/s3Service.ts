import dotenv from "dotenv";
dotenv.config();
const { S3 } = require('aws-sdk');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const uuid = require('uuid').v4;



// AWS.config.update({ region: 'eu-west-2' }); // Your AWS region
// const s3 = new AWS.S3();

// Update this function to handle in-memory file uploads (Multer buffer)

//S3 VERSION 2 - WITH URL IN BODY :)
export const uploadToS3v2 = async(file:any)=> {
  const s3 = new S3(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY);

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${uuid()}-${file.originalname}`, // The name of the file to be uploaded
    Body: file.buffer, // The content of the file
    ContentType: file.mimetype, // The content type of the file
    
  };
  const result = await s3.upload(param).promise();
  return result.location; // Return the URL of the uploaded file
}

//MULITPLE FILE UPLOAD
// const params = {files.map(files => {
//   return {
//     Bucket: process.env.S3_BUCKET_NAME,
//     Key: `uploads/${uuid()}-${file.originalname}`, // The name of the file to be uploaded
//     Body: file.buffer, // The content of the file
//     ContentType: file.mimetype, // The content type of the file
//   }
// })
// const results = await Promise.all(params.map(param => s3.upload(param).promise()))
// return results
// }

//S3 VERSION 3 - NO URL :(
// export const uploadToS3v3 = async (file: any) => {
//   const s3Client = new S3Client({
//     region: process.env.AWS_REGION, // include if needed
//     credentials: {
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//     }
//   })

//   const param = {
//     Bucket: process.env.S3_BUCKET_NAME,
//     Key: `uploads/${uuid()}-${file.originalname}`, // The name of the file to be uploaded
//     Body: file.buffer, // The content of the file
//     ContentType: file.mimetype, // The content type of the file
    
//   };
//   return s3Client.send(new PutObjectCommand(param))
// }