const mysql = require("mysql2");

// Create a connection pool
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "temp_twitter",
});

// Export the pool for use in other modules
module.exports = connection.promise();
