
var orm = require("../config/orm.js"); // Require the ORM to interact with Database

let posts = {
    all: function(cb){ //For loading all posts
        orm.all("posts", function(res){
            cb(res);
        });
    },
    allGenre: function(cb){ //For loading all genres
        orm.allGenre("posts", function(res){
            cb(res);
        });
    },
    getOne: function(vals, cb){ //For loading one post
        orm.getOne("posts", vals, function(res){
            //console.log("Vals: ", vals);
            cb(res);
        });
    },
    getLast: function(cb){ //For loading last post
        orm.getLast("posts", function(res){
            //console.log("Vals: ", vals);
            cb(res);
        });
    },
    create: function(cols, vals, cb){ //For creating new posts
        orm.create("posts", cols, vals, function(res){
            cb(res);
        }); //|||||||||||||||||||||NEED COMMENT JS|||||||||||||||||||||||||||
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