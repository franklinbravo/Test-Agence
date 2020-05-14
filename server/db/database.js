const mysql = require('mysql');
const mysqlConnection = mysql.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PWD_DB,
  database: process.env.DB,
  connectionLimit: 10,
})

module.exports = mysqlConnection;