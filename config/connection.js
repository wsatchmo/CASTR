var mysql = require("mysql"); // connection to mysql info
var connection;

if (process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        port: 3306,
        password: "MrMeseeksorgy", //process.env.LOCAL_DB_PASSWORD, //Change to your own
        database: "content_db"
    });
};

//make connection
connection.connect(function(err){
    if (err){
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId); 
});

module.exports = connection;
//exporting to ORM