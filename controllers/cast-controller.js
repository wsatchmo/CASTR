var express = require("express");
var router = express.Router();
var cast = require("../models/castr_model");

//CHANGE TO GET DATA FROM THE DB TO POST ONTO HOME PAGE
router.get('/', function(req, res){
    res.redirect('/landing') //Redirect to home page
});

router.get('/landing', function(req,res){
    cast.all(function(data){ //Display all burgers on home page
        var postsObj = {posts: data};
        console.log(postsObj);
        res.render('index', postsObj);
    });
});

//POSTS PAGE FOR ADDING, EDITING, DELETING POSTS ---
router.get('/newpost', function(req,res){
    res.render('newpost', {layout: 'main.handlebars'});
});

//ADDING POSTS
router.post("/newpost/add", function(req, res){
    cast.create([
        post_title = req.body.post_title,
        post_type = req.body.post_type,
        post_user = req.body.post_user,
        post_body = req.body.post_body,
        post_image = req.body.post_image
    ], [
        req.body.post_title, req.body.post_type, req.body.post_user, req.body.post_body, req.body.post_image
    ], function(result) {
        //PUSH STUFF TO THE DB
        res.render('/post/' + req.body.id);
    });
});

//POSTS PAGE FOR ADDING, EDITING, DELETING POSTS ---
router.get('/post/', function(req,res){
    res.render('post', {layout: 'main.handlebars'});
});

router.get('/post/:id', function(req,res){
    var id = req.params.id;
    //console.log("ID: ", id);
    cast.getOne(id, function(data){ //Display image by id
        var postsObj = {posts: data};
        console.log("postsObj :", postsObj);
        
        res.render('post', postsObj);
    });
});

//||||||||||||||||||||||||||         ||||||||||||||||||||||||||||
//////////////////////////// WORKING ////////////////////////////

// COMMENT ROUTE
router.post("/api/comments/:id", function(req, res){
    var postId  = req.params.id;
    var nameInput = req.body.name;
    var emailInput = req.body.email;
    var commentForm = req.body.comment;

    posts.create([postId, name, email, comment],[postId, nameInput,emailInput, commentForm], function(result) {
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
		res.render('index');
	});
});

//CHANGE SO THIS CAN DELETE A USER'S POSTS
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