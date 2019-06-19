CREATE DATABASE iservices;

USE iservices;

CREATE TABLE `users`
(
    `iduser` INTEGER
(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR
(45),
    `email` VARCHAR
(255),
    `user_uuid` CHAR
(36),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `username` VARCHAR
(40),
    `password` CHAR
(255),
    `update_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `role` ENUM
('CLIENTE', 'PROVEEDOR'),
    `verification_code` CHAR
(64),
    `Attribute_1` VARCHAR
(40),
    CONSTRAINT `PK_users` PRIMARY KEY
(`iduser`)
);

# ---------------------------------------------------------------------- #
#
Add table "services"                                                   #
#
---------------------------------------------------------------------- #

CREATE TABLE `services`
(
    `idservice` INTEGER
(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR
(45),
    `description` VARCHAR
(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `logo` VARCHAR
(255),
    `Attribute_1` VARCHAR
(40),
    `iduser` INTEGER
(11) NOT NULL,
    CONSTRAINT `PK_services` PRIMARY KEY
(`idservice`, `iduser`)
);

# ---------------------------------------------------------------------- #
#
Add table "categories"                                                 #
#
---------------------------------------------------------------------- #

CREATE TABLE `categories`
(
    `idcategory` INTEGER
(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR
(45),
    `description` VARCHAR
(45),
    `idservice` INTEGER
(11) NOT NULL,
    `iduser` INTEGER
(11) NOT NULL,
    CONSTRAINT `PK_categories` PRIMARY KEY
(`idcategory`, `idservice`, `iduser`)
);

-- # ---------------------------------------------------------------------- #
-- #
-- Add table "audit"                                                 #
-- #
-- ---------------------------------------------------------------------- #

-- CREATE TABLE `audit`
-- (
--     `idcategory` INTEGER
-- (11) NOT NULL AUTO_INCREMENT,
--     `name` VARCHAR
-- (45),
--     `description` VARCHAR
-- (45),
--     `idservice` INTEGER
-- (11) NOT NULL,
--     `iduser` INTEGER
-- (11) NOT NULL,
--     CONSTRAINT `PK_categories` PRIMARY KEY
-- (`idcategory`, `idservice`, `iduser`)
-- );
-- CREATE TABLE `auditoria` (
-- `usuario` VARCHAR(200) NULL DEFAULT NULL,
-- `descripcion` TEXT NULL,
-- `fecha` DATETIME NULL DEFAULT NULL
-- );
-- CREATE DEFINER=`hackabos`@`localhost` TRIGGER `services_after_update` AFTER UPDATE ON `services` FOR EACH ROW INSERT INTO audit
-- (iduser, descripcion,fecha)
-- VALUES (user( ),
-- CONCAT('Se modifico el precio del inmueble  ',NEW.id,' (',
-- OLD.precio,') por (', NEW.precio,')'),NOW())



# ---------------------------------------------------------------------- #
#
Add table "categories_users"                                           #
#
---------------------------------------------------------------------- #

CREATE TABLE `categories_users`
(
    `idcategory` INTEGER
(11) NOT NULL,
    `idservice` INTEGER
(11) NOT NULL,
    `iduser` INTEGER
(11) NOT NULL,
    `iduser1` INTEGER
(11) NOT NULL,
    CONSTRAINT `PK_categories_users` PRIMARY KEY
(`idcategory`, `idservice`, `iduser`, `iduser1`)
);

# ---------------------------------------------------------------------- #
#
Add foreign key constraints                                            #
#
---------------------------------------------------------------------- #

ALTER TABLE `categories`
ADD CONSTRAINT `services_categories` 
    FOREIGN KEY
(`idservice`, `iduser`) REFERENCES `services`
(`idservice`,`iduser`);

ALTER TABLE `services`
ADD CONSTRAINT `users_services` 
    FOREIGN KEY
(`iduser`) REFERENCES `users`
(`iduser`);

ALTER TABLE `categories_users`
ADD CONSTRAINT `categories_categories_users` 
    FOREIGN KEY
(`idcategory`, `idservice`, `iduser`) REFERENCES `categories`
(`idcategory`,`idservice`,`iduser`);

ALTER TABLE `categories_users`
ADD CONSTRAINT `users_categories_users` 
    FOREIGN KEY
(`iduser1`) REFERENCES `users`
(`iduser`);







