/***************************************************************************************
** Program name: CS340 Project players.js file
** Author: Takahiro Watanabe, Tyson Winneker
** Date: 08/06/18
** Description: Node.js file for our website's players page.
***************************************************************************************/

module.exports = function(){
    var express = require('express');
    var router = express.Router();


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
      var query = "SELECT p.id as pId, lastName, firstName, t.name as tName, 2ptFGs, 3ptFGs, rebounds, assists, steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as `total` FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id WHERE (p.lastName = '" + req.body.lastNameFilter + "' AND p.firstName = '" + req.body.firstNameFilter + "') OR (p.lastName = '" + req.body.lastNameFilter + "' OR p.firstName = '" + req.body.firstNameFilter + "')";
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

    /*Display all players (default). Requires web based javascript to delete players with AJAX*/
    router.get('/', function(req, res){
        var callbackCount = 0; 
        var context = {};
       // context.jsscripts = ["deleteplayers.js"];
        var mysql = req.app.get('mysql');
        getPlayers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
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
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('players', context);
            }
        }
    });

    /*Display players by name*/
    router.post('/filterPlayer', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        filterPlayers(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('players', context);
            }
        }
    });

    /* Route to delete a player, simply returns a 202 upon success. Ajax will handle this. */
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


    return router;
}();