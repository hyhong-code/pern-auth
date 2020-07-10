const Pool = require("pg").Pool;

const pool = new Pool({
  database: "jwtauth",
  user: "haiyanghong",
  password: "11271127",
  port: 5432,
  host: "localhost",
});

module.exports = pool;
