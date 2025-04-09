// /src/services/s3Service.ts
import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-2' }); // Your AWS region
const s3 = new AWS.S3();

// Update this function to handle in-memory file uploads (Multer buffer)
export const uploadToS3 = (fileBuffer: Buffer, bucketName: string, fileName: string): Promise<AWS.S3.ManagedUpload.SendData> => {
  const params: AWS.S3.PutObjectRequest = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileBuffer,
    ContentType: 'application/pdf',
  };

  return s3.upload(params).promise();
};
