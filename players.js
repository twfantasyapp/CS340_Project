/***************************************************************************************
** Program name: CS340 Project players.js file
** Author: Takahiro Watanabe, Tyson Winneker
** Date: 08/06/18
** Description: Node.js file for our website's players page.
***************************************************************************************/

module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /*function to return teams in the drop-down list*/
    function getTeams(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM prj_Team", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teams  = results;
            complete();
        });
    }


    /*function to return the table of the all players (default)*/
    function getPlayers(res, mysql, context, complete){
        mysql.pool.query("SELECT p.id as pId, lastName, firstName, t.name as tName, 2ptFGs, 3ptFGs, rebounds, assists, steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as `total` FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY `total` DESC", function(error, results, fields){
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
      var query = "SELECT p.id as pId, lastName, firstName, t.name as tName, 2ptFGs, 3ptFGs, rebounds, assists, steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as `total` FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY " + req.body.playerSort + " " + req.body.ascDesc;
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

   /*function to filter players by name*/
    function filterPlayers(req, res, mysql, context, complete){
      //var query = "SELECT p.id as pId, lastName, firstName, t.name as tName, 2ptFGs, 3ptFGs, rebounds, assists, steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as `total` FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id WHERE (p.lastName Like '%" + req.body.lastNameFilter + "%' AND p.firstName Like '%" + req.body.firstNameFilter + "%') OR (p.lastName = '" + req.body.lastNameFilter + "' OR p.firstName = '" + req.body.firstNameFilter + "')";
      var query = "SELECT p.id as pId, lastName, firstName, t.name as tName, 2ptFGs, 3ptFGs, rebounds, assists, steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as `total` FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id WHERE (p.lastName Like '%" + req.body.lastNameFilter + "%' AND p.firstName Like '%" + req.body.firstNameFilter + "%')";
	  mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to delete players*/
    function deletePlayers(req, res, mysql, context, complete){
        mysql.pool.query("DELETE FROM prj_Player WHERE id =?", [req.query.deletePlayers], function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return a single player*/
    function getOnePlayer(res, mysql, context, id, complete){
        var sql = "SELECT id, firstName, lastName, team, 2ptFGs, 3ptFGs, rebounds, assists, steals FROM prj_Player WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results[0];
            complete();
        });
    }

    /*Display all players (default). Requires web based javascript to delete players with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0; 
        var context = {};
       // context.jsscripts = ["deleteplayers.js"];
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('players', context);
            }

        }
    });

    /*Display all players by sorting order*/
    router.post('/sortPlayer', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        sortPlayers(req, res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('players', context);
            }
        }
    });

    /*Display players using firstName and/or lastName filters*/
    router.post('/filterPlayer', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        filterPlayers(req, res, mysql, context, complete);
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('players', context);
            }
        }
    });

    /* Adds a player, redirects to the players page after adding */
    router.post('/addPlayer', function(req, res){
        //console.log(req.body.homeworld)
        //console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO prj_Player (firstName, lastName, team) VALUES (?,?,?)";
        var inserts = [req.body.firstName, req.body.lastName, req.body.team];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/players');
            }
        });
    });

    /*Route to delete a player*/
    router.get('/delete', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        deletePlayers(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.redirect('/players');
            }
        }
    });


    /* Display one player for the specific purpose of updating players */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedteam.js", "updateplayer.js"];
        var mysql = req.app.get('mysql');
        getOnePlayer(res, mysql, context, req.params.id, complete);
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-players', context);
            }

        }
    });


   /* The URI that update data is sent to in order to update a person */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE prj_Player SET team=?, 2ptFGs=?, 3ptFGs=?, rebounds=?, assists=?, steals=? WHERE id=?";
        var inserts = [req.body.team, req.body.twoptFG, req.body.thrptFG, req.body.rebounds, req.body.assists, req.body.steals, req.params.id];
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

    return router;
}();