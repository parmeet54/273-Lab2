const mysql = require('mysql');

// DB Setup
const db = mysql.createConnection({
    user:'admin',
    host:'db-273-lab1.cnhf2ck6mcsk.us-west-1.rds.amazonaws.com',
    password:'273lab1db',
    database:'lab1'
})

db.connect(function(err){
    if(err){
        throw err;
    }
    console.log("Database Connected");
})

module.exports = db;