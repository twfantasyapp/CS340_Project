var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_watantak',
  password        : '1196',
  database        : 'cs340_watantak'
});

module.exports.pool = pool;
