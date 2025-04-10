import { connection } from "../utils/db";

export const insertFileData = async (
  fileUrl: string,
  extractedText: string
) => {
  const [rows] = await connection.execute(
    "INSERT INTO pdf_documents (file_url, extracted_text) VALUES (?, ?)",
    [fileUrl, extractedText]
  );
  return rows;
};
