CREATE TABLE `products` (
	`id` INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`product_id` INT(11) NOT NULL,
	`category` VARCHAR(255)NOT NULL,
	`description` TEXT NOT NULL,
	`price` INT(11) NOT NULL,
	`new_price` INT(11),
	`image` VARCHAR(255),
	`date_entered` DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`product_name` VARCHAR(255) NOT NULL,
	`status` VARCHAR(255) NOT NULL,
	`discount` INT(11) NOT NULL
);

CREATE TABLE `user`( user_id INT( 11 ) PRIMARY KEY AUTO_INCREMENT NOT NULL,  username varchar( 255 ) UNIQUE NOT NULL, full_name varchar ( 255 ) NOT NULL, email varchar ( 255 ) UNIQUE NOT NULL, phone VARCHAR(255) NOT NULL, code INT( 11 ) NOT NULL, password varchar( 255 ) NOT NULL, date_registered DATETIME  DEFAULT CURRENT_TIMESTAMP)	;

DELIMITER //
CREATE PROCEDURE `newcat`(category VARCHAR( 255 ))
	BEGIN
	UPDATE category SET rgt = rgt + 2;
	UPDATE category SET lft = lft + 2;
	INSERT INTO category(category, rgt, lft) VALUES(category, 1, 2);
	END//
DELIMITER ;