USE test_db;
DROP TABLE IF EXISTS users;
CREATE TABLE files (
  file_id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(100) NOT NULL,
  text_content TEXT NOT NULL,
  file_path VARCHAR(255) 
);
INSERT INTO files (filename, text_content, file_path)
VALUES ('wiki.pdf', 'extracted text goes here', '/assets/wiki.pdf');

SELECT * FROM files;


SHOW TABLES;