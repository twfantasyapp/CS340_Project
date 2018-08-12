-- CS340 Summer 2018
-- Group 5 Project Data Manipulation Language (DML) Queries
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

--------------------------------------------------------------------------
-- Index.html
--------------------------------------------------------------------------
-- Default SELECT query for Top 10 Players by Total Points
SELECT lastName, firstName, t.name, 2ptFGs, 3ptFGs, rebounds, assists, steals, (2ptFGs, 3ptFGs, rebounds, assists, steals) as total
FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id
GROUP BY lastName, firstName
ORDER BY total DESC
LIMIT 10;

-- [[FORM CONTROLLED]] SELECT query for Top 10 Players by User Choice
SELECT lastName, firstName, t.name, 2ptFGs, 3ptFGs, rebounds, assists, steals, (2ptFGs, 3ptFGs, rebounds, assists, steals) as total
FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id
GROUP BY lastName, firstName
ORDER BY [playerSort] [ascDesc]
LIMIT 10;


-- Default SELECT query for Top 10 Teams by Win Percentage (wins/total games played i.e. wins + losses)
SELECT name, wins, losses, (wins + losses) as gamesPlayed, if((wins+losses)>0,wins/(wins+losses), 0) as winPerc, (concat(c.lastName,' ', left(c.firstName,1),'.')) as coach
FROM prj_Team t INNER JOIN prj_HeadCoach c ON t.headCoach = c.id
GROUP BY name
ORDER BY winPerc DESC
LIMIT 10;
						  
-- [[FORM CONTROLLED]] SELECT query for Top 10 Teams by User Choice
SELECT name, wins, losses, (wins + losses) as gamesPlayed, if((wins+losses)>0,wins/(wins+losses), 0) as winPerc, (concat(c.lastName,' ', left(c.firstName,1),'.')) as coach
FROM prj_Team t INNER JOIN prj_HeadCoach c ON t.headCoach = c.id
GROUP BY name
ORDER BY [teamSort] [ascDesc]
LIMIT 10;

--------------------------------------------------------------------------
-- Players.html
--------------------------------------------------------------------------
-- Default SELECT query for all Players ordered alphabetically by last name Ascending
SELECT p.id, lastName, firstName, t.name, 2ptFGs, 3ptFGs, rebounds, assists, steals, (2ptFGs, 3ptFGs, rebounds, assists, steals) as total
FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id
GROUP BY lastName, firstName
ORDER BY lastName;

-- [[FORM CONTROLLED]] SELECT query for all or filtered subset of Players ordered by User Choice
SELECT p.id, lastName, firstName, t.name, 2ptFGs, 3ptFGs, rebounds, assists, steals, (2ptFGs, 3ptFGs, rebounds, assists, steals) as total
FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id
WHERE lastName Like [lastNameFilter] And firstName Like [firstNameFilter]
GROUP BY lastName, firstName
ORDER BY [playerSort] [ascDesc];

-- [[FORM CONTROLLED]] INSERT INTO query to add a new player to the players entity - fantasy points per category all default to 0
INSERT INTO prj_Player (firstName, lastName, team) VALUES ([firstName], [lastName], SELECT id FROM prj_Team WHERE name = '[team]');

-- [[FORM CONTROLLED]] INSERT INTO query to add playerPosition records based on the same form as above (checkbox) probably need a loop here in the javascript if multiple positions selected
INSERT INTO prj_PlayerPosition (playerID, positionID) VALUES (LAST_INSERTED_ID(), SELECT id FROM prj_Position WHERE abbreviatedName = '[position]');

-- [[FORM CONTROLLED]] UPDATE (edit) query to edit either the player's team, or modify fantasy points
UPDATE prj_Player SET team = (SELECT id FROM prj_Team WHERE name = '[team]'), 2ptFGs = [2ptFG], 3ptFGs = [3ptFG], rebounds = [rebounds], assists = [assists], steals = [steals]
WHERE id = [playerID];

-- [[FORM CONTROLLED]] UPDATE (edit) query to insert only unique records (IGNORE keyword). IF the playerPosition combo already exists, mySQL will silently discard and continue
INSERT IGNORE INTO prj_PlayerPosition (playerID, positionID) VALUES ([playerID], SELECT id FROM prj_Position WHERE abbreviatedName = '[position]');  -- probably need a JS loop here

-- [[FORM CONTROLLED]] DELETE query to delete the selected player by playerID
DELETE FROM prj_Player WHERE id = [playerID];

-- if the above DELETE does not cascade to the many to many prj_PlayerPosition table, either change the referential rule or call the following query
DELETE FROM prj_PlayerPosition WHERE playerID = [playerID];

--------------------------------------------------------------------------
-- Teams.html
--------------------------------------------------------------------------
-- Default SELECT query for all Teams ordered by Win Percentage (wins/total games played i.e. wins + losses)
SELECT t.id, name, wins, losses, (wins + losses) as gamesPlayed, if((wins+losses)>0,wins/(wins+losses), 0) as winPerc, (concat(c.lastName,' ', left(c.firstName,1),'.')) as coach
FROM prj_Team t INNER JOIN prj_HeadCoach c ON t.headCoach = c.id
GROUP BY name
ORDER BY winPerc DESC;
						  
-- [[FORM CONTROLLED]] SELECT query for all Teams ordered by User Choice
SELECT t.id, name, wins, losses, (wins + losses) as gamesPlayed, if((wins+losses)>0,wins/(wins+losses), 0) as winPerc, (concat(c.lastName,' ', left(c.firstName,1),'.')) as coach
FROM prj_Team t INNER JOIN prj_HeadCoach c ON t.headCoach = c.id
GROUP BY name
ORDER BY [teamSort] [ascDesc];

-- [[FORM CONTROLLED]] INSERT INTO query to add a new team to the teams entity - wins/losses will default to 0
INSERT INTO prj_Team (name, conference, city, headCoach) VALUES ([teamName], (SELECT id FROM prj_conference WHERE name = '[teamConference]'), '[teamCity]', 
(SELECT id FROM prj_HeadCoach WHERE lastName = '[lastName]' AND firstName = '[firstName]');

-- [[FORM CONTROLLED]] UPDATE (edit) query to edit either the team's city/location, their head coach, or their win/loss count
UPDATE prj_Team SET city = '[teamCity]', headCoach = (SELECT id FROM prj_HeadCoach WHERE lastName = '[lastName]' AND firstName = '[firstName]'), wins = [teamWins], losses = [teamLosses])
WHERE id = [teamID];

--------------------------------------------------------------------------
-- Coaches.html
--------------------------------------------------------------------------
-- Default SELECT query for all Coaches ordered by Salary
SELECT c.id, lastName, firstName, t.name, salary, dob, email
FROM prj_HeadCoach c LEFT JOIN prj_Team t ON c.id = t.headCoach
ORDER BY salary DESC;

-- [[FORM CONTROLLED]] SELECT query for all Coaches ordered by User Choice
SELECT c.id, lastName, firstName, t.name, salary, dob, email
FROM prj_HeadCoach c LEFT JOIN prj_Team t ON c.id = t.headCoach
ORDER BY [coachSort] [ascDesc];

-- [[FORM CONTROLLED]] INSERT INTO query to add a new coach to the coaches entity
INSERT INTO prj_HeadCoach (fistName, lastName, dob, email, salary) VALUES ('[coachFirstName]', '[coachLastName]', [coachDOB], '[coachEmail]', [coachSalary]);

-- [[FORM CONTROLLED]] UPDATE (edit) query to edit either the coach's dob, email, or salary
UPDATE prj_HeadCoach SET dob = [coachDOB], email = '[coachEmail]', salary = [coachSalary]
WHERE id = [coachID];

--------------------------------------------------------------------------
-- Other.html
--------------------------------------------------------------------------
-- Default SELECT query for all Positions, ordered alphabetically
SELECT name, abbreviatedName
FROM prj_Position
ORDER BY name;

-- [[FORM CONTROLLED]] INSERT INTO query to add a new position to the position entity
INSERT INTO prj_Position (name, abbreviatedName) VALUES ('[positionName]', '[positionAbbr]');

-- Default SELECT query for all Conferences, ordered alphabetically
SELECT name
FROM prj_Conference
ORDER BY name;

-- [[FORM CONTROLLED]] INSERT INTO query to add a new conference to the conference entity
INSERT INTO prj_Conference (name) VALUES ('[conferenceName]');