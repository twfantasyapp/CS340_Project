/***************************************************************************************
** Program name: CS340 Project other.js file
** Author: Takahiro Watanabe, Tyson Winneker
** Date: 08/12/18
** Description: Node.js file for our website's Other page.
***************************************************************************************/

module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /*function to return the table of the all conferences (default)*/
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
	
    /*Display all conferences (default)*/
    router.get('/', function(req, res){
        var callbackCount = 0; 
        var context = {};
       // context.jsscripts = ["deleteteams.js"];
        var mysql = req.app.get('mysql');
		getConferences(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('other', context);
            }

        }
    });

	/* Adds a conference, redirects to the 'other' page after adding */
    router.post('/addConference', function(req, res){
        var mysql = req.app.get('mysql');

        var sql = "INSERT INTO prj_Conference (name) VALUES (?)";
        var inserts = [req.body.name];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/other');
            }
        });
    });
	
    return router;
}();