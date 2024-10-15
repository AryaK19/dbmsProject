CREATE DATABASE hackathon_db;

USE hackathon_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NULL,
  profile_image VARCHAR(255),
  DOB INT NULL
);

CREATE TABLE user_dob(
	DOB INT PRIMARY KEY,
    age INT NOT NULL
    
);

CREATE TABLE admin(
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NULL
);

CREATE TABLE organisations(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
	contact_email VARCHAR(255),
	contact_phone VARCHAR(255)
);


CREATE TABLE hackathons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  organisation_id INT,
  participants INT,
  date DATE,
  admin_id INT,
  
  FOREIGN KEY (admin_id) REFERENCES admin(id),
  FOREIGN KEY (organisation_id) REFERENCES organisations(id)
);

CREATE TABLE registrations (
  user_id INT,
  hackathon_id INT,
  status VARCHAR(50),
  
  PRIMARY KEY (user_id, hackathon_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (hackathon_id) REFERENCES hackathons(id)
);


CREATE TABLE gallery (
	id INT AUTO_INCREMENT PRIMARY KEY,
    hackathon_id INT NOT NULL,
	image_url VARCHAR(255) NOT NULL,
	
	FOREIGN KEY (hackathon_id) REFERENCES hackathons(id)
);

CREATE TABLE comments (
	id INT AUTO_INCREMENT PRIMARY KEY,
	content TEXT NOT NULL,
	user_id INT NOT NULL,
	hackathon_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (hackathon_id) REFERENCES hackathons(id)
);

CREATE TABLE comments_reply (
	comment_id INT NOT NULL,
	reply TEXT NOT NULL,
	FOREIGN KEY (comment_id) REFERENCES comments(id)
);


