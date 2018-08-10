/***************************************************************************************
** Program name: CS340 Project players.js file
** Author: Takahiro Watanabe, Tyson Winneker
** Date: 08/10/18
** Description: Node.js file for our website's teams page.
***************************************************************************************/

module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /*function to return teams in the drop-down list*/
    function getTeams(res, mysql, context, complete){
		var sql = "SELECT t.id as tId, t.name, c.name as conference, t.city, (concat(h.lastName,' ', left(h.firstName,1),'.')) as headCoach, t.wins, t.losses, if((t.wins+t.losses)>0,t.wins/(t.wins+t.losses), 0) as winPerc " +
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

    /*Display all teams (default)*/
    router.get('/', function(req, res){
        var callbackCount = 0; 
        var context = {};
       // context.jsscripts = ["deleteteams.js"];
        var mysql = req.app.get('mysql');
        getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('teams', context);
            }

        }
    });

	


    return router;
}();