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

//POSTS PAGE IS FOR ADDING, EDITING, DELETING POSTS ---
router.get('/posts', function(req,res){
    res.render('newpost', {layout: 'newpost.handlebars'});
});

//CHANGE SO THIS CAN POST FROM A USER [OR ANON]
router.post("/posts/create", function(req, res){
    posts.create([
        "post_title", "post_type", "post_user", "post_body", "post_image"
    ], [
        req.body.post_title, req.body.post_type, req.body.post_user, req.body.post_body, req.body.post_image
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

//CHANGE SO THIS CAN EDIT A USER'S POSTS
router.put("/posts/update/:id", function(req, res){
	var condition = "id=" + req.params.id;
	console.log("condition", condition);

	posts.updateOne({
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
  
    posts.deleteOne(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
module.exports = router;