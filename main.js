/***************************************************************************************
** Program name: CS340 Project main.js file
** Author: Takahiro Watanabe, Tyson Winneker
** Date: 07/29/18
** Description: This is the main Node.js file for CS340's project assignment.
***************************************************************************************/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var cors = require('cors');
app.use(cors());

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static('public'));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/', require('./index_html.js'));
app.use('/players', require('./players.js'));
app.use('/players_position', require('./player_pos.js'));
app.use('/teams', require('./teams.js'));
app.use('/coaches', require('./coaches.js'));
app.use('/other', require('./other.js'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
