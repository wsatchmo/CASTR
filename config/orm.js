    var connection = require("../config/connection.js"); //Connections dependency

 // Array of question marks -- to be used as parameterized variables
 function printQuestionMarks(num){
     var arr = [];

     for (var i = 0; i < num; i++){
         arr.push('?');
     };
     return arr.toString();
 };

var orm = {
    all: function(table, cb){  //GET ALL POSTS
        var queryString = "SELECT * FROM " + table + " ORDER BY id DESC";
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    allGenre: function(table, cb){  //GET ALL DISTINCT GENRES
        var queryString = "SELECT DISTINCT post_type FROM posts"
        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    create: function(table, cols, vals, cb){ // CREATE POST
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

    getOne: function(table, vals, cb){ //SELECT ITEM FROM TABLE WHERE ID == GIVEN IN VALS
        var queryString = "SELECT * FROM " + table + " WHERE id = ";
        queryString += vals;
        console.log("QUERY STRING: ", queryString);
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    getLast: function(table, cb){ //SELECT ITEM FROM TABLE BY LAST ID DESCENDING (LAST)
        var queryString = "SELECT id FROM " + table + " ORDER BY id DESC LIMIT 1";
        console.log("Firing");
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    //||||||||||||||||||||||||||         ||||||||||||||||||||||||||||
    //////////////////////////// COMMENT ////////////////////////////

    getComments: function(post_id, cb){ //SELECT ITEM FROM TABLE WHERE ID == GIVEN IN post_id
        var comQueryString = "SELECT * FROM comments WHERE postId = ";
        comQueryString += post_id;
        console.log("COMMENT QUERY STRING: ", comQueryString);
        connection.query(comQueryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    addComment: function(vals, cb){ // CREATE -
        var queryString = "INSERT INTO comments (postId, name, email, comment) VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        console.log("===========vals:: ");
        console.log(vals);
        connection.query(queryString, vals, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    //||||||||||||||||||||||||||                    ||||||||||||||||||||||||||||
    //////////////////////////// DELETE/UPDATE POST ////////////////////////////

    //NOT YET IMPLEMENTED -- REMEMBER TO ACCOUNT FOR DELETED ID's IN THE DB
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