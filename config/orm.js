 var connection = require('../config/connection.js'); //Connections dependency

 // Array of question marks -- to be used as parameterized variables
 function printQuestionMarks(num){
     var arr = [];

     for (var i = 0; i < num; i++){
         arr.push('?');
     };
     return arr.toString();
 };

var orm = {
    all: function(table, cb){  //ALL -
        var queryString = "SELECT * FROM " + table + " ORDER BY id DESC";

        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    allGenre: function(table, cb){  //ALL BY GENRE -
        var queryString = "SELECT DISTINCT post_type FROM " + table;

        //console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    create: function(table, cols, vals, cb){ // CREATE -
        var queryString = "INSERT INTO " + table;
        queryString += " (post_title, post_type, post_user, post_body, post_image) VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, vals, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    getOne: function(table, vals, cb){ // CREATE -
        var queryString = "SELECT * FROM " + table + " WHERE id = ";
        queryString += vals;
        //SELECT ITEM FROM TABLE WHERE ID == GIVEN IN VALS
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    getLast: function(table, cb){ // CREATE -
        var queryString = "SELECT id FROM " + table + " ORDER BY id DESC LIMIT 1";  //SOMETHING WRONG HERE?!?!?!
        //SELECT ITEM FROM TABLE WHERE ID == GIVEN IN VALS
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    //||||||||||||||||||||||||||         ||||||||||||||||||||||||||||
    //////////////////////////// WORKING ////////////////////////////

    comment: function(table, cols, vals, cb){ // CREATE -
        var queryString = "INSERT INTO " + table;
        queryString += " (postId, name, email, comment) VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, vals, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    //||||||||||||||||||||||||||NOT SURE?||||||||||||||||||||||||||||
    //////////////////////////// WORKING ////////////////////////////

    delete: function(table, condition, cb){
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE "; //CHANGE THIS TO DELETE POSTS
        queryString += condition; //the WHERE clause

        console.log(queryString);
        connection.query(queryString, function(err, result){
		if(err){
			throw err;
		}
		cb(result);
	    });
    },

    updateOne: function(table, condition, cb){
        var queryString = "UPDATE " + table;
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