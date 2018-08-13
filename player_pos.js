/***************************************************************************************
** Program name: CS340 Project player_pos.js file
** Author: Takahiro Watanabe, Tyson Winneker
** Date: 08/09/18
** Description: Node.js file for our website's players' positions page.
***************************************************************************************/

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* get players to populate in dropdown */
    function getPlayer(res, mysql, context, complete){
        mysql.pool.query("SELECT id, firstName, lastName FROM prj_Player", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /* get positions to populate in dropdown */
    function getPosition(res, mysql, context, complete){
        sql = "SELECT id, abbreviatedName AS posName FROM prj_Position";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.position = results
            complete();
        });
    }

    /* get players with positions */
    function getPlayerWithPosition(res, mysql, context, complete){
        sql = "SELECT playerID AS plyId, positionID AS posId, CONCAT(firstName,' ',lastName) AS name, abbreviatedName AS posName FROM prj_Player INNER JOIN prj_PlayerPosition ON prj_Player.id = prj_PlayerPosition.playerID INNER JOIN prj_Position ON prj_Position.id = prj_PlayerPosition.positionID ORDER BY name, posName"
         mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.player_with_pos = results
            complete();
        });
    }
  
    /*function to return a single player*/
    function getOnePlayer(res, mysql, context, plyId, complete){
        var sql = "SELECT id, firstName, lastName, team, 2ptFGs, 3ptFGs, rebounds, assists, steals FROM prj_Player WHERE id = ?";
        var inserts = [plyId];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results[0];
            complete();
        });
    }

    /*function to return the selected player's positions (the specific position with which the user clicked the 'update' button and positions the player doesn't play) on the update page*/
    function getAvlPosition(res, mysql, context, plyId, posId, complete){
        var sql = "SELECT p.id as id, p.abbreviatedName as posName " +
                  "FROM prj_Position p LEFT JOIN prj_PlayerPosition pp ON p.id = pp.positionID " +
                  "WHERE pp.playerID = ? AND pp.positionID = ? Or " +
                      "p.id NOT IN (SELECT positionID FROM prj_PlayerPosition WHERE playerID = ?)";
        var inserts = [plyId, posId, plyId];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.position = results;
            complete();
        });
    }

    /*function to specify the selected player's position (the specific position with which the user clike the 'update' button) on the multiple selection menu on the update page*/
    function getOnePlayerWithPosition(res, mysql, context, plyId, posId, complete){
        sql = "SELECT playerID AS plyId, positionID AS posId, abbreviatedName AS posName FROM prj_Player INNER JOIN prj_PlayerPosition ON prj_Player.id = prj_PlayerPosition.playerID INNER JOIN prj_Position ON prj_Position.id = prj_PlayerPosition.positionID WHERE playerID = ? AND positionID = ? ORDER BY name, posName"
        var inserts = [plyId, posId];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player_with_pos = results[0];
            complete();
        });
    }


    /* List players with positions along with 
     * displaying a form to associate a player with multiple positions
     */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteplayers.js"];
        var mysql = req.app.get('mysql');
        var handlebars_file = 'player_position'

        getPlayer(res, mysql, context, complete);
        getPosition(res, mysql, context, complete);
        getPlayerWithPosition(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render(handlebars_file, context);
            }
        }
    });

    /* Associate position(s) with a player and 
     * then redirect to the players_position page after adding 
     */
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var position = req.body.pos
        var player = req.body.plyId
        for (let po of position) {
          var sql = "INSERT INTO prj_PlayerPosition (playerID, positionID) VALUES (?,?)";
          var inserts = [player, po];
          sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
            }
          });
        } //for loop ends here 
        res.redirect('/players_position');
    });

    /* Delete a player's positions record */
    /* This route will accept a HTTP DELETE request in the form
     * /plyid/{{plyId}}/posid/{{posId}} -- which is sent by the AJAX form 
     */
    router.delete('/plyid/:plyId/posid/:posId', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM prj_PlayerPosition WHERE playerId = ? AND positionId = ?";
        var inserts = [req.params.plyId, req.params.posId];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400); 
                res.end(); 
            }else{
                res.status(202).end();
            }
        })
    })

    /* Display one player for the specific purpose of updating the player's position*/
    router.get('/:plyId/:posId', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedpos.js", "updateplayerpos.js"];
        var mysql = req.app.get('mysql');
        getOnePlayer(res, mysql, context, req.params.plyId, complete);
        getAvlPosition(res, mysql, context, req.params.plyId, req.params.posId, complete);
        getOnePlayerWithPosition(res, mysql, context, req.params.plyId, req.params.posId, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-player-pos', context);
            }

        }
    });


    /* update the player's position(s) 
     * then redirect to the players_position page after updating 
     */
    router.post('/update/:plyId/:posId', function(req, res){
        var mysql = req.app.get('mysql');
        var position = req.body.pos
        var player = req.params.plyId
        var curPos = req.params.posId
        var count = 0
        for (let po of position) {
          
          if(po==curPos){
            count=1
          }
          var sql = "INSERT INTO prj_PlayerPosition (playerID, positionID) VALUES (?,?)";
          var inserts = [player, po];
          sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
            }
          });
        } //for loop ends here
        /* if the player's current position (the position with which the user clicked the 'update' button) is not selected on the update page,
         * the position and the associated player row will be deleted from the PlayerPostion talbe.
        */
        if(count==0){
            var mysql = req.app.get('mysql');
            var sql = "DELETE FROM prj_PlayerPosition WHERE playerId = ? AND positionId = ?";
            var inserts = [req.params.plyId, req.params.posId];
            sql = mysql.pool.query(sql, inserts, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.status(400); 
                    res.end(); 
                }else{
                    res.status(202).end();
                }
            })
        } 
        res.redirect('/players_position');
    });

    return router;
}();