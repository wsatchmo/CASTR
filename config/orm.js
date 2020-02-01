//      TEST OBJECT--
//     post_title: DataTypes.STRING,
//     post_type: DataTypes.STRING,
//     post_user: DataTypes.STRING,
//     post_body: DataTypes.STRING,
//     time_created: DataTypes.DATE

 //Object for SQL statements

 var connection = require('../config/connection.js'); //Connections dependency

 function printQuestionMarks(num){ // Array of question marks -- to be used as sequelize variables 
     var arr = [];
 
     for (var i = 0; i < num; i++){
         arr.push('?');
     };
     return arr.toString();
 }; 

var orm = {
    all: function(posts, cb){  //ALL - 
        var queryString = "SELECT * FROM " + posts;

        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    create: function(posts, cols, vals, cb){ // CREATE -
        var queryString = "INSERT INTO " + posts;
        queryString += " (";
        queryString += cols.toString(); //MAKE SURE THIS IS THE COLUMN NAMES
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length); //MAKE SURE THIS IS THE CORRECT AMOUNT OF VARIABLES
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, vals, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    updateOne: function(posts, condition, cb){
	var queryString = "UPDATE " + posts;
	queryString += " SET devoured = true WHERE "; //CHANGE THIS TO UPDATE POSTS -- WHEN EDITING? ETC [???]
	queryString += condition; //the WHERE clause

	console.log(queryString);
	connection.query(queryString, function(err, result){
		if(err){
			throw err;
		}
		cb(result);
	});
 },
};

module.exports = orm;