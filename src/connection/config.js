const mysql = require("mysql2");
const env = process.env;
const config = {
  connectionLimit: env.CONNECTION_LIMIT,
  host: env.HOST,
  user: env.USER_NAME,
  password: env.PASSWORD,
  database: env.DATABASE,
};

const pool = mysql.createConnection(config);
pool.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

module.exports = pool;
