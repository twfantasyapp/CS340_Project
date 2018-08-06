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
        mysql.pool.query("SELECT lastName as `LastName`, firstName as `FirstName`, t.name AS `Team`, 2ptFGs as `2ptFGs`, 3ptFGs as `3ptFGs`, rebounds as `Rebounds`, assists as `Assists`, steals as `Steals`, (2ptFGs + 3ptFGs + rebounds + assists + steals) as `Total` FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY `Total` DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by last name (ascending)*/
    function getPlayersLNameAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY lastName ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by last name (descending)*/
    function getPlayersLNameDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY lastName DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by first name (ascending)*/
    function getPlayersFNameAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY firstName ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by first name (descending)*/
    function getPlayersFNameDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY firstName DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by 2pt FG (ascending)*/
    function getPlayers2ptAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY 2ptFGs ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by 2pt FG (descending)*/
    function getPlayers2ptDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY 2ptFGs DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by 3pt FG (ascending)*/
    function getPlayers3ptAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY 3ptFGs ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by 3pt FG (descending)*/
    function getPlayers3ptDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY 3ptFGs DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by rebounds (ascending)*/
    function getPlayersRebAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY rebounds ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by rebounds (descending)*/
    function getPlayersRebDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY rebounds DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by assists (ascending)*/
    function getPlayersAstAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY assists ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by assists (descending)*/
    function getPlayersAstDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY assists DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by steal (ascending)*/
    function getPlayersStlAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY steals ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by steal (descending)*/
    function getPlayersStlDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY steals DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }


    /*function to return the table of the top 10 players by total points (ascending)*/
    function getPlayersTotalAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY Total ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.player = results;
            complete();
        });
    }

    /*function to return the table of the top 10 players by total points (descending)*/
    function getPlayersTotalDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT lastName as Last Name, firstName as First Name, t.name AS Team, 2ptFGs as 2pt FGs, 3ptFGs as 3pt FGs, rebounds as Rebounds, assists as Assists, steals as Steals, (2ptFGs + 3ptFGs + rebounds + assists + steals) as Total FROM prj_Player p INNER JOIN prj_Team t ON p.team = t.id ORDER BY Total DESC LIMIT 10", function(error, results, fields){
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
        mysql.pool.query("SELECT name as `Name`, wins as `Wins`, losses as `Losses`, (wins + losses) AS `GP`, if((wins + losses) > 0, wins/(wins + losses), 0) AS `WinPerc`, CONCAT(hc.lastName, ' ', left(hc.firstName, 1), '.') as `HeadCoach` FROM prj_Team t INNER JOIN prj_HeadCoach hc ON t.headCoach = hc.id ORDER BY `WinPerc` DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

    /*function to return the table of the top 10 teams by name (ascending)*/
    function getTeamsNameAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT name as Name, wins as Wins, losses as Losses, (wins + losses) AS GP, if((wins + losses) > 0, wins/(wins + losses), 0) AS Win %, CONCAT(hc.lastName, ' ', left(hc.firstName, 1), '.') as Head Coach FROM prj_Team t INNER JOIN prj_HeadCoach hc ON t.headCoach = hc.id ORDER BY name ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

    /*function to return the table of the top 10 teams by name (descending)*/
    function getTeamsNameDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT name as Name, wins as Wins, losses as Losses, (wins + losses) AS GP, if((wins + losses) > 0, wins/(wins + losses), 0) AS Win %, CONCAT(hc.lastName, ' ', left(hc.firstName, 1), '.') as Head Coach FROM prj_Team t INNER JOIN prj_HeadCoach hc ON t.headCoach = hc.id ORDER BY name DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

    /*function to return the table of the top 10 teams by wins (ascending)*/
    function getTeamsWinAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT name as Name, wins as Wins, losses as Losses, (wins + losses) AS GP, if((wins + losses) > 0, wins/(wins + losses), 0) AS Win %, CONCAT(hc.lastName, ' ', left(hc.firstName, 1), '.') as Head Coach FROM prj_Team t INNER JOIN prj_HeadCoach hc ON t.headCoach = hc.id ORDER BY wins ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

    /*function to return the table of the top 10 teams by wins (descending)*/
    function getTeamsWinDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT name as Name, wins as Wins, losses as Losses, (wins + losses) AS GP, if((wins + losses) > 0, wins/(wins + losses), 0) AS Win %, CONCAT(hc.lastName, ' ', left(hc.firstName, 1), '.') as Head Coach FROM prj_Team t INNER JOIN prj_HeadCoach hc ON t.headCoach = hc.id ORDER BY wins DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

    /*function to return the table of the top 10 teams by losses (ascending)*/
    function getTeamsLossAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT name as Name, wins as Wins, losses as Losses, (wins + losses) AS GP, if((wins + losses) > 0, wins/(wins + losses), 0) AS Win %, CONCAT(hc.lastName, ' ', left(hc.firstName, 1), '.') as Head Coach FROM prj_Team t INNER JOIN prj_HeadCoach hc ON t.headCoach = hc.id ORDER BY losses ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

    /*function to return the table of the top 10 teams by losses (descending)*/
    function getTeamsLossDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT name as Name, wins as Wins, losses as Losses, (wins + losses) AS GP, if((wins + losses) > 0, wins/(wins + losses), 0) AS Win %, CONCAT(hc.lastName, ' ', left(hc.firstName, 1), '.') as Head Coach FROM prj_Team t INNER JOIN prj_HeadCoach hc ON t.headCoach = hc.id ORDER BY losses DESC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

    /*function to return the table of the top 10 teams by win % (ascending)*/
    function getTeamsWinPercAsc(res, mysql, context, complete){
        mysql.pool.query("SELECT name as Name, wins as Wins, losses as Losses, (wins + losses) AS GP, if((wins + losses) > 0, wins/(wins + losses), 0) AS Win %, CONCAT(hc.lastName, ' ', left(hc.firstName, 1), '.') as Head Coach FROM prj_Team t INNER JOIN prj_HeadCoach hc ON t.headCoach = hc.id ORDER BY Win % ASC LIMIT 10", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results;
            complete();
        });
    }

    /*function to return the table of the top 10 teams by win % (descending)*/
    function getTeamsWinPercDesc(res, mysql, context, complete){
        mysql.pool.query("SELECT name as Name, wins as Wins, losses as Losses, (wins + losses) AS GP, if((wins + losses) > 0, wins/(wins + losses), 0) AS Win %, CONCAT(hc.lastName, ' ', left(hc.firstName, 1), '.') as Head Coach FROM prj_Team t INNER JOIN prj_HeadCoach hc ON t.headCoach = hc.id ORDER BY Win % DESC LIMIT 10", function(error, results, fields){
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
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
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


    /*Display top 10 players by last name (ascending)*/
    router.get('/lastname/asc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersLNameAsc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by last name (descending)*/
    router.get('/lastname/desc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersLNameDesc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by first name (ascending)*/
    router.get('/firstname/asc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersFNameAsc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by first name (descending)*/
    router.get('/firstname/desc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersFNameDesc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });

    

    /*Display top 10 players by 2pt FG (ascending)*/
    router.get('/2pt/asc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayers2ptAsc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by 2pt FG (descending)*/
    router.get('/2pt/desc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayers2ptDesc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by 3pt FG (ascending)*/
    router.get('/3pt/asc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayers3ptAsc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by 3pt FG (descending)*/
    router.get('/3pt/desc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayers3ptDesc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by rebounds (ascending)*/
    router.get('/reb/asc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersRebAsc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by rebounds (descending)*/
    router.get('/reb/desc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersRebDesc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by assists (ascending)*/
    router.get('/ast/asc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersAstAsc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by assists (descending)*/
    router.get('/ast/desc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersAstDesc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by steals (ascending)*/
    router.get('/stl/asc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersStlAsc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by steals (descending)*/
    router.get('/stl/desc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersStlDesc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by total (ascending)*/
    router.get('/total/asc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersTotalAsc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top 10 players by total (descending)*/
    router.get('/total/desc', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPlayersTotalDesc(req,res, mysql, context, complete);
        //getTeams(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top teams by name (ascending)*/
    router.get('/tname/asc', function(req, res){
        var callbackCount = 0; 
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        //getPlayers(res, mysql, context, complete);
        getTeamsNameAsc(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top teams by name (descending)*/
    router.get('/tname/desc', function(req, res){
        var callbackCount = 0; 
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        //getPlayers(res, mysql, context, complete);
        getTeamsNameDesc(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });    


    /*Display top teams by wins (ascending)*/
    router.get('/wins/asc', function(req, res){
        var callbackCount = 0; 
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        //getPlayers(res, mysql, context, complete);
        getTeamsWinAsc(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top teams by wins (descending)*/
    router.get('/wins/desc', function(req, res){
        var callbackCount = 0; 
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        //getPlayers(res, mysql, context, complete);
        getTeamsWinDesc(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });    


    /*Display top teams by losses (ascending)*/
    router.get('/losses/asc', function(req, res){
        var callbackCount = 0; 
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        //getPlayers(res, mysql, context, complete);
        getTeamsLossAsc(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top teams by losses (descending)*/
    router.get('/losses/desc', function(req, res){
        var callbackCount = 0; 
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        //getPlayers(res, mysql, context, complete);
        getTeamsLossDesc(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });    


    /*Display top teams by win % (ascending)*/
    router.get('/winperc/asc', function(req, res){
        var callbackCount = 0; 
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        //getPlayers(res, mysql, context, complete);
        getTeamsWinPercAsc(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    });


    /*Display top teams by win % (descending)*/
    router.get('/winperc/desc', function(req, res){
        var callbackCount = 0; 
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        //getPlayers(res, mysql, context, complete);
        getTeamsWinPercDesc(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('index_html', context);
            }

        }
    })


    return router;
}();