//Goblin-made ORM for requesting and sending data to the DB
var orm = require("../config/orm.js"); // Interact with Database

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
        }); 
    }, 

    //||||||||||||||||||||| COMMENTS |||||||||||||||||||||||||||
    getComments: function(post_id, cb){ //Get comments of a post
        orm.getComments(post_id, function(res){
            cb(res);
        });
    },
    addComment: function(comment_added, cb){ //Add a new comment to post
        orm.addComment(comment_added, function(res){
            cb(res);
        });
    },
    //||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    //NOT YET IMPLEMENTED::
    deleteOne: function(table, objColVals, condition, cb){ //Delete post if same user
        orm.deleteOne("posts", objColVals, condition, function(res){
            cb(res);
        });
    }
}; 

module.exports = posts;