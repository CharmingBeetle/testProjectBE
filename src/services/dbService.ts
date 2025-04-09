// /src/services/dbService.ts
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'your-rds-endpoint',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database',
});

export const insertTextToDb = (fileName: string, textContent: string): Promise<void> => {
  const query = "INSERT INTO pdf_texts (file_name, text_content) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    connection.execute(query, [fileName, textContent], (err, results) => {
      if (err) {
        reject("Error inserting text into DB: " + err);
      } else {
        resolve();
      }
    });
  });
};
