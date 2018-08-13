/***************************************************************************************
** Program name: CS340 Project coaches.js file
** Author: Takahiro Watanabe, Tyson Winneker
** Date: 08/10/18
** Description: Node.js file for our website's coaches page.
***************************************************************************************/

module.exports = function(){
    var express = require('express');
    var router = express.Router();


    /*function to return the table of the all coaches (default)*/
    function getCoaches(res, mysql, context, complete){
		var sql = "SELECT h.id as hId, h.lastName, h.firstName, (DATE_FORMAT(dob, '%Y-%m-%d')) as dob, email, salary, t.name as team " +
				  "FROM prj_HeadCoach h LEFT JOIN prj_Team t ON h.id = t.headCoach " +
				  "ORDER BY h.lastName";
		
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.coaches  = results;
            complete();
        });
    }
	
	/*function to sort coaches based on user form selections*/
    function sortCoaches(req, res, mysql, context, complete){
		var sql = "SELECT h.id as hId, h.lastName, h.firstName, (DATE_FORMAT(dob, '%Y-%m-%d')) as dob, email, salary, t.name as team " +
				  "FROM prj_HeadCoach h LEFT JOIN prj_Team t ON h.id = t.headCoach " +
				  "ORDER BY " + req.body.coachSort + " " + req.body.ascDesc;
				  
		mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.coaches = results;
            complete();
        });
    }

	/*function to return a single coach when user wants to edit the coach's attributes*/
    function getOneCoach(res, mysql, context, id, complete){
        var sql = "SELECT id as hId, lastName, firstName, (DATE_FORMAT(dob, '%Y-%m-%d')) as dob, email, salary " +
				  "FROM prj_HeadCoach " +
				  "WHERE id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.coach = results[0];
            complete();
        });
    }
	
    /*Display all coaches (default)*/
    router.get('/', function(req, res){
        var callbackCount = 0; 
        var context = {};
       // context.jsscripts = ["deleteteams.js"];
        var mysql = req.app.get('mysql');
        getCoaches(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('coaches', context);
            }

        }
    });

	/*Display all coaches by sorting order*/
    router.post('/sortCoaches', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        sortCoaches(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('coaches', context);
            }
        }
    });
	
    /* Display one coach for the specific purpose of updating the attributes of that coach */
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatecoach.js"];
        var mysql = req.app.get('mysql');
        getOneCoach(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-coaches', context);
            }

        }
    });
	
	/* The URI that update data is sent to in order to update a coach */
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
		if(req.body.dob==''){
			req.body.dob = null;
		}
		if(req.body.email==''){
			req.body.email = null;
		}
		if(req.body.salary==0){
			req.body.salary = null;
		}
        var sql = "UPDATE prj_HeadCoach SET lastName=?, firstName=?, dob=STR_TO_DATE(?, '%Y-%m-%d'), email=?, salary=? WHERE id=?";
        var inserts = [req.body.lastName, req.body.firstName, req.body.dob, req.body.email, req.body.salary, req.params.id];
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
	
	/* Adds a coach, redirects to the coaches page after adding */
    router.post('/addCoach', function(req, res){
        var mysql = req.app.get('mysql');
		if(req.body.dob==''){
			req.body.dob = null;
		}
		if(req.body.email==''){
			req.body.email = null;
		}
		if(req.body.salary==0){
			req.body.salary = null;
		}
        var sql = "INSERT INTO prj_HeadCoach (lastName, firstName, dob, email, salary) VALUES (?,?,STR_TO_DATE(?, '%Y-%m-%d'),?,?)";
        var inserts = [req.body.lastName, req.body.firstName, req.body.dob, req.body.email, req.body.salary];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/coaches');
            }
        });
    });

    return router;
}();