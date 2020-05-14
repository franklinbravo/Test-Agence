const mysql = require('mysql');
const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'banco_de_datos',
  connectionLimit: 10,
})

module.exports = mysqlConnection;
