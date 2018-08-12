-- CS340 Summer 2018
-- Group 5 Project Data Definition Language (DDL) Queries
-- Takahiro Watanabe
-- Tyson Winneker

-- While on FLIP get to mysql command line with
-- mysql -u cs340_winneket -p -h classmysql.engr.oregonstate.edu cs340_winneket
-- enter password when prompted

-- To load .sql file from commandline
-- source ./ddq.sql

-- Helpful commands
-- show databases;
-- show tables;
-- DESCRIBE [tableName]

-- In case this is an iterative process, first DROP the tables if they exist already
DROP TABLE IF EXISTS prj_PlayerPosition;
DROP TABLE IF EXISTS prj_Position;
DROP TABLE IF EXISTS prj_Player;
DROP TABLE IF EXISTS prj_Team;
DROP TABLE IF EXISTS prj_HeadCoach;
DROP TABLE IF EXISTS prj_Conference;

-- Create new tables
CREATE TABLE prj_Position (
   id int NOT NULL AUTO_INCREMENT,
   name varchar(15) NOT NULL,
   abbreviatedName varchar(2) NOT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE prj_Conference (
   id int NOT NULL AUTO_INCREMENT,
   name varchar(25) NOT NULL,
   PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE prj_HeadCoach (
   id int NOT NULL AUTO_INCREMENT, 
   firstName varchar(25) NOT NULL,
   lastName varchar(25) NOT NULL,
   dob date,
   email varchar(50),
   salary int,
   PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE prj_Team (
   id int NOT NULL AUTO_INCREMENT,
   name varchar(30) NOT NULL,
   conference int NOT NULL,
   city varchar(25) NOT NULL,
   headCoach int NOT NULL,
   wins int NOT NULL DEFAULT '0',
   losses int NOT NULL DEFAULT '0',
   PRIMARY KEY (id),
   CONSTRAINT prj_Team_fk1 FOREIGN KEY (conference) REFERENCES prj_Conference (id) ON DELETE CASCADE ON UPDATE CASCADE,
   CONSTRAINT prj_Team_fk2 FOREIGN KEY (headCoach) REFERENCES prj_HeadCoach (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE prj_Player (
   id int NOT NULL AUTO_INCREMENT,
   firstName varchar(25) NOT NULL,
   lastName varchar(25) NOT NULL,
   team int NOT NULL,
   2ptFGs int NOT NULL DEFAULT '0',
   3ptFGs int NOT NULL DEFAULT '0',
   rebounds int NOT NULL DEFAULT '0',
   assists int NOT NULL DEFAULT '0',
   steals int NOT NULL DEFAULT '0',
   PRIMARY KEY (id),
   CONSTRAINT prj_Player_fk1 FOREIGN KEY (team) REFERENCES prj_Team (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE prj_PlayerPosition (
   playerID int NOT NULL DEFAULT '0',
   positionID int NOT NULL DEFAULT '0',
   PRIMARY KEY (playerID, positionID),
   CONSTRAINT prj_PlayerPosition_fk1 FOREIGN KEY (playerID) REFERENCES prj_Player (id),
   CONSTRAINT prj_PlayerPosition_fk2 FOREIGN KEY (positionID) REFERENCES prj_Position (id)
) ENGINE=InnoDB;

-- Data Modification Language (DML) Queries to populate our tables with some default records
--Add the conferences
INSERT INTO prj_Conference VALUES (1,'EASTERN'),(2,'WESTERN');

--Add some coaches
INSERT INTO prj_HeadCoach VALUES (1,'Luke', 'Walton', '1970-2-2', 'lwalton@gmail.com', NULL),(2,'Steve', 'Kerr', '1962-4-6', 'skerr@yahoo.com',2200000),
								 (3,'Tyronn', 'Lue', '1958-10-10', NULL, NULL),(4,'Fred', 'Hoiberg', NULL, 'yourboy@aol.com',1800000),
								 (5,'Brett', 'Brown', '1976-1-23', 'brettb@hotmail.com', NULL),(6,'Terry', 'Stotts', NULL, 'stottsterry@gmail.com',2900000);

--Add some teams
INSERT INTO prj_Team VALUES (1,'Los Angeles Lakers',2,'Los Angeles',1,5,2),(2,'Golden State Warriors',2,'Oakland',2,1,6),(3,'Cleveland Cavaliers',1,'Cleveland',3,4,3),
                            (4,'Chicago Bulls',1,'Chicago',4,7,0),(5,'Philadelphia 76ers',1,'Philadelphia',5,1,6),(6,'Portland Trailblazers',2,'Portland',6,6,1);
							
--Add some positions
INSERT INTO prj_Position VALUES (1, 'Point Guard', 'PG'),(2, 'Shooting Guard', 'SG'),(3, 'Small Forward', 'SF'),(4, 'Power Forward', 'PF'),(5, 'Center', 'C');

--Add some players
INSERT INTO prj_Player VALUES (1, 'Lebron', 'James', 1, 5, 3, 7, 4, 2),(2, 'Kevin', 'Durant', 2, 4, 5, 5, 3, 1),(3, 'Damian', 'Lillard', 6, 5, 5, 2, 3, 1),
                              (4, 'C.J.', 'McCollum', 6, 2, 1, 3, 2, 3), (5, 'Brook', 'Lopez', 1, 1, 1, 0,5,3),(6, 'Jae', 'Crowder', 3, 2, 2, 0,0,1),
                              (7, 'Joel', 'Embiid', 5, 5, 2, 8, 3, 1), (8, 'J.J.', 'Redick', 5, 2, 0, 1, 1, 0), (9, 'Lauri', 'Markkanen', 4, 5, 1, 9, 2, 0);

--Map some players to positions
INSERT INTO prj_PlayerPosition VALUES (1,4),(1,2),(2,3),(3,1),(3,2),(4,4),(5,2),(5,5),(6,5),(6,2),(7,4),(7,2),(8,1),(8,2),(9,3),(9,2),(9,5);							  
