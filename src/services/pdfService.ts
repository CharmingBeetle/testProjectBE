// /src/services/pdfService.ts
import pdf from 'pdf-parse';
import AWS from 'aws-sdk';
const textract = new AWS.Textract();

export const extractTextFromPdf = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(filePath);
    pdf(data)
      .then(result => resolve(result.text))
      .catch(err => reject(err));
  });
};

export const extractTextWithTextract = (bucketName: string, fileName: string): Promise<string> => {
  const params: AWS.Textract.AnalyzeDocumentRequest = {
    Document: {
      S3Object: {
        Bucket: bucketName,
        Name: fileName,
      },
    },
  };

  return textract.analyzeDocument(params).promise()
    .then(data => data.Blocks.map(block => block.Text).join(' '))
    .catch(err => {
      console.error("Textract error:", err);
      throw new Error("Error extracting text with Textract");
    });
};
