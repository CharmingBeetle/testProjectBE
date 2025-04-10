import mysql from 'mysql2/promise';

// Use async/await for a cleaner, promise-based approach
const createConnection = async() => {
    return await mysql.createConnection({
  host: 'test-db-1.cb0skimgi6f4.eu-west-2.rds.amazonaws.com',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'test_db',
})
}

// Function to insert extracted text into DB
export const insertTextToDb = async (fileName: string, textContent: string): Promise<void> => {

  try {
    const connection = await createConnection(); // Create the connection asynchronously
    const query = "INSERT INTO pdf_texts (file_name, text_content) VALUES (?, ?)";
    
    // Execute the query with parameters
    await connection.execute(query, [fileName, textContent]);

    // Close the connection after executing
    await connection.end(); 
  } catch (err) {
    throw new Error(`Error inserting text into DB: ${err}`);
  }
};
