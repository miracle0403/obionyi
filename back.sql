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


