const mysql = require("mysql2");

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "hackabos",
  password: "password",
  database: "iservices",
  multipleStatements: true
});

mysqlConnection.connect(function(err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log("MySql Database is connected");
  }
});

module.exports = mysqlConnection;
