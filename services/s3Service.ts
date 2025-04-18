import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  }
});

export const uploadToS3 = async (file: Express.Multer.File) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: `uploads/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  await s3Client.send(new PutObjectCommand(params));
  return `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
};