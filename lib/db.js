const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'SH-User',
  database: 'smarthome',
  password: '********'
});

//TODO Passwort für DB-user hinterlegen

connection.connect();
module.exports = connection;