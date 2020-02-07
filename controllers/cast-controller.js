var express = require("express");
var router = express.Router();
var cast = require("../models/castr_model");

//HOME PAGE
router.get("/", function(req, res){
    res.redirect("/landing") //Redirect to home page
});

//SHOW ALL POSTS ON HOME
router.get("/landing", function(req,res){
    cast.all(function(data){ //Get all post objs for home page
        var postsObj = {posts: data};
        console.log(postsObj);
        res.render("index", postsObj);
    });
});

//POSTS PAGE FOR NEW POSTS ---
router.get('/newpost', function(req,res){
    cast.allGenre(function(data){ //Display all genres in dropdown
        var postsObj = {posts: data};
        console.log(postsObj);
        res.render("newpost", postsObj);
    });
});

//ADDING POSTS
router.post("/newpost/add", function(req, res){
    cast.create([ //Create a post w/ these parameters
        post_title = req.body.post_title,
        post_type = req.body.post_type,
        post_user = req.body.post_user,
        post_body = req.body.post_body,
        post_image = req.body.post_image
    ], [
        req.body.post_title, req.body.post_type, req.body.post_user, req.body.post_body, req.body.post_image
    ], function(result) {

    });
});

//GET THE LAST POST IN DB BY ID
router.get('/newpost/post', function(req,res){
    cast.getLast(function(result){
        console.log("result ::");
        console.log(result[0].id);
        //Gives the result number
        res.redirect("/post/" + result[0].id);
    });
});

//PAGES OF INDIVIDUAL POSTS USE THIS LAYOUT
router.get('/post/', function(req,res){
    res.render('post', {layout: 'main.handlebars'});
});

//SPECIFIC POST -- BY ID
router.get('/post/:id', function(req,res){
    var id = req.params.id;
    console.log("req: ");
    console.log(req.params);
    //console.log("ID: ", id);
    cast.getOne(id, function(data){ //Get obj w/ corresponding id
        var postsObj = {posts: data};
        console.log("postsObj :", postsObj);
        if (postsObj.posts.length !== 0){
            res.render('post', postsObj);
        } else { //If there is nothing in the post obj load newpost instead
            res.redirect("/newpost");
        }
    });
});

//RANDOM ITEM FROM DB
router.get('/random', function(req, res){
    cast.getLast(function(result){
        console.log("result ::");
        console.log(result[0].id);
        let last = parseInt(result[0].id);
        let random = Math.floor(Math.random() * last) + 1;
        //Random number using last id in db
        res.redirect("/post/" + random);
    });
});

//||||||||||||||||||||||||||         ||||||||||||||||||||||||||||
//////////////////////////// WORKING ////////////////////////////

// COMMENT ROUTE
router.post("/comments/:id", function(req, res){
    var postId  = req.params.id;
    var nameInput = req.body.name;
    var emailInput = req.body.email;
    var commentForm = req.body.commentBody;

    cast.comment([postId, name, email, comment],[postId, nameInput,emailInput, commentForm], function(result) {
        console.log(result)
        console.log("comment added to db")
    });
});

//CHANGE SO THIS CAN EDIT A USER'S POSTS
router.put("/posts/update/:id", function(req, res){
	var condition = "id=" + req.params.id;
	console.log("condition", condition);

	cast.updateOne({
        post_title: req.body.post_title,
        post_type: req.body.post_type,
        post_user: req.body.post_user,
        post_body: req.body.post_body,
        post_image: req.body.post_image
	}, condition, function(data){
		res.render("index");
	});
});

//CHANGE SO THIS CAN DELETE A USER"S POSTS
router.delete("/posts/delete/:id", function(req, res) {

    var condition = "id = " + req.params.id;

    cast.deleteOne(condition, function(result) {

      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
module.exports = router;