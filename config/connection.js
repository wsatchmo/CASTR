const mysql = require("mysql"); //mysql dependency
const dotenv = require("dotenv").config(); //dotenv dependency
let connection;

if (process.env.JAWSDB_URL){ //Jaws db connection
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: process.env.DB_HOST, //Create .env file & fill_
        user: process.env.DB_USER, //in your connection info_
        port: 3306,                //equal to these variables
        password: process.env.DB_PASS, 
        database:  process.env.DATABASE
    });
};

//make connection
connection.connect(function(err){
    if (err){
        console.error("error connecting: " + err.stack);
        return;
    } else {
        console.log("connected as id " + connection.threadId);
    }
});

//exporting to ORM
module.exports = connection;