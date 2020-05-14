const mysql = require('mysql');
const mysqlConnection = mysql.createPool({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b76713da097d12',
  password: '4384f445',
  database: 'heroku_930f7921567023e',
  connectionLimit: 10,
})

module.exports = mysqlConnection;