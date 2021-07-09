const mysql = require('mysql')

const db = mysql.createConnection({
host: "db-cluster.rmuti.ac.th",
user: "kminnovations",
password: "+kminnovations;12588-",
database:"kminnovations" 
})

module.exports = db;