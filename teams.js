/***************************************************************************************
** Program name: CS340 Project teams.js file
** Author: Takahiro Watanabe, Tyson Winneker
** Date: 08/10/18
** Description: Node.js file for our website's teams page.
***************************************************************************************/

module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /*function to return the table of the all teams (default)*/
    function getTeams(res, mysql, context, complete){
		var sql = "SELECT t.id as tId, t.name as teamName, c.name as confName, t.city, (concat(h.lastName,' ', left(h.firstName,1),'.')) as HCName, " +
		               "t.wins, t.losses, if((t.wins+t.losses)>0,t.wins/(t.wins+t.losses), 0) as winPerc " +
				  "FROM prj_Team t LEFT JOIN prj_Conference c ON t.conference = c.id LEFT JOIN prj_HeadCoach h ON t.headCoach = h.id " +
				  "ORDER BY t.name";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teams  = results;
            complete();
        });
    }
	
	/*function to sort teams based on user form selections*/
    function sortTeams(req, res, mysql, context, complete){
		var sql = "SELECT t.id as tId, t.name as teamName, c.name as confName, t.city, (concat(h.lastName,' ', left(h.firstName,1),'.')) as HCName, " +
			           "t.wins, t.losses, if((t.wins+t.losses)>0,t.wins/(t.wins+t.losses), 0) as winPerc " +
				  "FROM prj_Team t LEFT JOIN prj_Conference c ON t.conference = c.id LEFT JOIN prj_HeadCoach h ON t.headCoach = h.id " +
				  "ORDER BY " + req.body.teamSort + " " + req.body.ascDesc;
		mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teams = results;
            complete();
        });
    }

	/*function to return a single team when user wants to edit the team's attributes*/
    function getOneTeam(res, mysql, context, id, complete){
        var sql = "SELECT t.id as tId, t.name as teamName, t.conference as conId, c.name as confName, t.city, t.headCoach as hcId, (concat(h.lastName,' ', left(h.firstName,1),'.')) as HCName, " +
			           "t.wins, t.losses, if((t.wins+t.losses)>0,t.wins/(t.wins+t.losses), 0) as winPerc " +
				  "FROM prj_Team t INNER JOIN prj_Conference c ON t.conference = c.id LEFT JOIN prj_HeadCoach h ON t.headCoach = h.id " +
				  "WHERE t.id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results[0];
            complete();
        });
    }
	
	/*function to return conferences in the Edit Team drop-down list*/
    function getConferences(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM prj_Conference", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.conferences  = results;
            complete();
        });
    }
	

/*    function getHeadCoaches(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM prj_HeadCoach", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.headCoaches = results;
            complete();
        });
    }
*/

	/*function to return existing HC or Head Coaches with no job in the Edit Team drop-down list*/
    function getHeadCoaches(res, mysql, context, id, complete){
		var sql = "SELECT h.id as id, (concat(h.lastName, ' ', left(h.firstName,1),'.')) as name " +
				  "FROM prj_HeadCoach h LEFT JOIN prj_Team t ON h.id = t.headCoach " +
				  "WHERE h.id = (SELECT headCoach FROM prj_Team WHERE id = ?) Or " +
				      "h.id NOT IN (SELECT headCoach FROM prj_Team)";
		var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.headCoaches  = results;
            complete();
        });
    }
	
	/*function to return Head Coaches with no job in the Edit Team drop-down list*/
    function getUnemployedHC(res, mysql, context, complete){
		var sql = "SELECT h.id as id, (concat(h.lastName, ' ', left(h.firstName,1),'.')) as name " +
				  "FROM prj_HeadCoach h LEFT JOIN prj_Team t ON h.id = t.headCoach " +
				  "WHERE h.id NOT IN (SELECT headCoach FROM prj_Team)";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.unemployed  = results;
            complete();
        });
    }
	
    /*Display all teams (default)*/
    router.get('/', function(req, res){
        var callbackCount = 0; 
        var context = {};
       // context.jsscripts = ["deleteteams.js"];
        var mysql = req.app.get('mysql');
        getTeams(res, mysql, context, complete);
		getUnemployedHC(res, mysql, context, complete);
		getConferences(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('teams', context);
            }

        }
    });

	/*Display all teams by sorting order*/
    router.post('/sortTeams', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        sortTeams(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('teams', context);
            }
        }
    });
	
    /* Display one team for the specific purpose of updating the attributes of that team */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedconference.js", "selectedheadcoach.js", "updateteam.js"];
        var mysql = req.app.get('mysql');
        getOneTeam(res, mysql, context, req.params.id, complete);
        getConferences(res, mysql, context, complete);
		getHeadCoaches(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-teams', context);
            }

        }
    });
	
	/* The URI that update data is sent to in order to update a team */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE prj_Team SET conference=?, city=?, headCoach=?, wins=?, losses=? WHERE id=?";
        var inserts = [req.body.confName, req.body.city, req.body.headCoach, req.body.wins, req.body.losses, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

	/* Adds a team, redirects to the teams page after adding */
    router.post('/addTeam', function(req, res){
        var mysql = req.app.get('mysql');

        var sql = "INSERT INTO prj_Team (name, conference, city, headCoach) VALUES (?,?,?,?)";
        var inserts = [req.body.name, req.body.conference, req.body.city, req.body.headCoach];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/teams');
            }
        });
    });
	
    return router;
}();