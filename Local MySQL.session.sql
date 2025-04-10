import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
dotenv.config();
import mysql from 'mysql2/promise';

USE test_db;
DROP TABLE IF EXISTS files;
CREATE TABLE pdf_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  original_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(512) NOT NULL,
  extracted_text LONGTEXT,
  file_url VARCHAR(512) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP NULL,
  is_processed BOOLEAN DEFAULT FALSE
);
INSERT INTO files (original_name, file_path, extracted_text, file_url, created_at, processed_at, is_processed),

VALUES ('wiki.pdf', '/assests/wiki.pdf', 'extracted text goes here', `process.env.OBJECT_URL${uuid()}-${file.originalname}` CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

SELECT * FROM files;


SHOW TABLES;