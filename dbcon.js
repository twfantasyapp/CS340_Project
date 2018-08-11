var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_winneket',
  password        : '9714',
  database        : 'cs340_winneket'
});

module.exports.pool = pool;
