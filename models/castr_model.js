
var orm = require("../config/orm.js"); // Require the ORM to interact with Database

let posts = {
    all: function(cb){ //For loading all posts -- CHANE TO FIRST 20 OR SO???
        orm.all("posts", function(res){
            cb(res);
        });
    }, //create columns for new posts
    create: function(cols, vals, cb){
        orm.create("posts", cols, vals, function(res){
            cb(res);
        });
    }, //update columns and conditions for posts
    updateOne: function(table, objColVals, condition, cb){
        orm.updateOne("posts", objColVals, condition, function(res){
            cb(res);
        });
    },
    deleteOne: function(table, objColVals, condition, cb){
        orm.deleteOne("posts", objColVals, condition, function(res){
            cb(res);
        });
    }
}; 

module.exports = posts;

