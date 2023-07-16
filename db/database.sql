CREATE DATABASE company;
USE company;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) DEFAULT NULL,
    password VARCHAR(150) DEFAULT NULL,
    PRIMARY KEY(id)
);

INSERT INTO users VALUES
	(1, 'Ryan Ray', 'ray34ryan'),
    (2, 'Joe McMilan', 'mcMilanSupreme'),
    (3, 'Bobby Carter', 'CarterMaster34');
    