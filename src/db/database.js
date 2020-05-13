const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b76713da097d12',
  password: '4384f445',
  database: 'heroku_930f7921567023e',
  multipleStatements: true
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;