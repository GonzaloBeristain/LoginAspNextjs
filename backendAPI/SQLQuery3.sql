CREATE DATABASE DBLOGIN;
USE DBLOGIN;

CREATE TABLE Usuario (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Apellido VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Imagen VARCHAR(255)
);

INSERT INTO Usuario (Nombre, Apellido, Email, Password)
VALUES ('Gonzalo', 'Beristain', 'gonzalo@mail.com', '123456');

SELECT * FROM Usuario;