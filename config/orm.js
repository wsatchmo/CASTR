 var connection = require('../config/connection.js'); //Connections dependency

 // Array of question marks -- to be used as parameterized variables
 function printQuestionMarks(num) {
     var arr = [];

     for (var i = 0; i < num; i++) {
         arr.push('?');
     };
     return arr.toString();
 };

 var orm = {
         all: function (table, cb) { //GET ALL POSTS
             var queryString = "SELECT * FROM " + table + " ORDER BY id DESC";

             connection.query(queryString, function (err, result) {
                 if (err) throw err;
                 cb(result);
             });
         },

         allGenre: function (table, cb) { //GET ALL DISTINCT GENRES
             var queryString = "SELECT DISTINCT post_type FROM " + table;
             //console.log(queryString);
             connection.query(queryString, function (err, result) {
                 if (err) throw err;
                 cb(result);
             });
         },

         create: function (table, cols, vals, cb) { // CREATE POST
             var queryString = "INSERT INTO " + table;
             queryString += " (post_title, post_type, post_user, post_body, post_image) VALUES (";
             queryString += printQuestionMarks(vals.length);
             queryString += ") ";

             console.log(queryString);
             connection.query(queryString, vals, function (err, result) {
                 if (err) throw err;
                 cb(result);
             });
         },

         getOne: function (table, vals, cb) { //SELECT ITEM FROM TABLE WHERE ID == GIVEN IN VALS
             var queryString = "SELECT * FROM " + table + " WHERE id = ";
             queryString += vals;
             connection.query(queryString, function (err, result) {
                 if (err) throw err;
                 cb(result);
             });
         },

         getLast: function (table, cb) { //SELECT ITEM FROM TABLE BY LAST ID DESCENDING (LAST)
             var queryString = "SELECT id FROM " + table + " ORDER BY id DESC LIMIT 1";
             connection.query(queryString, function (err, result) {
                 if (err) throw err;
                 cb(result);
             });
         },

         //||||||||||||||||||||||||||         ||||||||||||||||||||||||||||
         //////////////////////////// COMMENT ////////////////////////////

         getComments: function (table, postId, cb) {
             orm.getComments("comments", postId, function (res) {
                 cb(res);
             });
         },
         addComments: function (table, postId, newComment, cb) {
             orm.addComments("comments", postId, newComment, function (res) {
                 cb(res);
             });
         },
         //||||||||||||||||||||| COMMENT |||||||||||||||||||||||||||
        };


         module.exports = orm;