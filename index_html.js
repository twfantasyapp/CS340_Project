/***************************************************************************************
** Program name: CS340 Project index_html.js file
** Author: Takahiro Watanabe, Tyson Winneker
** Date: 07/29/18
** Description: Node.js file for our website's homepage.
***************************************************************************************/

module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /*function to return the table of the top 10 players (default)*/
    function getPlayers(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName, firstName, t.name as tName, 2ptFGs, 3ptFGs, rebounds, assists, steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as `total` FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY `total` DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

   /*function to sort players*/
    function sortPlayers(req, res, mysql, context, complete){
      var query = "SELECT lastName, firstName, t.name as tName, 2ptFGs, 3ptFGs, rebounds, assists, steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as `total` FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY " + req.body.playerSort + " " + req.body.ascDesc + " LIMIT 10";
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 teams (default)*/
    function getTeams(res, mysql, context, complete){
        mysql.pool.query("SELECT name, wins, losses, (wins + losses) AS `gp`, if((wins + losses) > 0, wins/(wins + losses), 0) AS `winPerc`, CONCAT(hc.lastName, ' ', left(hc.firstName, 1), '.') as `headCoach` FROM prj_Team t INNER JOIN prj_HeadCoach hc ON t.headCoach = hc.id ORDER BY `winPerc` DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

    /*function to sort teams*/
    function sortTeams(req, res, mysql, context, complete){
      var query = "SELECT name, wins, losses, (wins + losses) AS `gp`, if((wins + losses) > 0, wins/(wins + losses), 0) AS `winPerc`, CONCAT(hc.lastName, ' ', left(hc.firstName, 1), '.') as `headCoach` FROM prj_Team t INNER JOIN prj_HeadCoach hc ON t.headCoach = hc.id ORDER BY " + req.body.teamSort + " " + req.body.ascDesc + " LIMIT 10";
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }


    /*Display top 10 players and teams (default)*/
    router.get('/', function(req, res){
        var callbackCount = 0; 
        var context = {};
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('index_html', context);
            }

        }
    });

    /*Display top 10 players by sorting order*/
    router.post('/sortPlayer', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        sortPlayers(req, res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('index_html', context);
            }
        }
    });

    /*Display top 10 teams by sorting order*/
    router.post('/sortTeam', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        sortTeams(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('index_html', context);
            }
        }
    });

    return router;
}();