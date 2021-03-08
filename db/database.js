const mysql = require("mysql2");

// create connection to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3001,
  user: "root",
  password: "Pokemon23?",
  database: "employees"
});

// error function
connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;