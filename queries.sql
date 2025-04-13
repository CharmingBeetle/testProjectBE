USE test_db;
DROP TABLE IF EXISTS pdf_documents;
CREATE TABLE pdf_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  original_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(512) NOT NULL,
  extracted_text LONGTEXT,
  file_url VARCHAR(512) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at TIMESTAMP NULL,
  is_processed BOOLEAN DEFAULT FALSE,
  title VARCHAR(255) DEFAULT NULL,
  author VARCHAR(255) DEFAULT NULL,
  keywords TEXT DEFAULT NULL,
  page_count INT DEFAULT 1,
  creator VARCHAR(255) DEFAULT NULL
);

INSERT INTO pdf_documents 
(original_name, 
file_path, 
extracted_text, 
file_url, 
created_at, 
processed_at, 
is_processed
)

VALUES (
  'wiki.pdf', 
  '/assests/wiki.pdf', 
  'extracted text goes here', "https://pdftexts.s3.eu-west-2.amazonaws.com/uploads/c27e98d3-dc49-44b3-a0d0-132a2cf3b7cb-wiki.pdf", 
  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

SELECT * FROM pdf_documents;


SHOW TABLES;