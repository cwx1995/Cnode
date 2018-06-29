const mysql = require('mysql');
const config = require('../config');
const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : config.database.host,
  user            : config.database.user,
  password        : config.database.password,
  database        : config.database.database
});

// pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

module.exports = pool;