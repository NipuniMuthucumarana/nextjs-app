//connect to database
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "19941202",
    host: "localhost",
    port: 5432,
    database: "my-app"
});

module.exports = pool;