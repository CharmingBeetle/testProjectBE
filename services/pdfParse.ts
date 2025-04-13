import pdf from 'pdf-parse';

export const extractTextFromPdf = async (buffer: Buffer): Promise<string> => {
  const { text } = await pdf(buffer);
  return text;
};