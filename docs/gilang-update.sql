/* ------ gilang - update 21/02/2013 17:08 ------ */

CREATE TABLE SHAREHOLDING_AMOUNTS(
 SHAREHOLDING_AMOUNT_ID INT(19) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 SHAREHODLING_ID INT(19) NOT NULL,
 AMOUNT FLOAT NOT NULL DEFAULT 0,
 CREATED_DATE DATETIME NOT NULL,
 MODIFIED_DATE TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)ENGINE=INNODB;