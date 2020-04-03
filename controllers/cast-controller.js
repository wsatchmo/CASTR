const express = require("express");
const router = express.Router();
const cast = require("../models/castr_model");

//HOME PAGE
router.get("/", function(req, res){
    res.redirect("/landing") //Redirect to home page
});

//SHOW ALL POSTS ON HOME
router.get("/landing", function(req,res){
    cast.all(function(data){ //Get all post objs for home page
        let postsObj = {posts: data};
        // console.log(postsObj);
        res.render("index", postsObj);
    });
});

//POSTS PAGE FOR NEW POSTS ---
router.get('/newpost', function(req,res){
    cast.allGenre(function(data){ //Display all genres in dropdown
        let postsObj = {posts: data};
        // console.log(postsObj);
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
        // console.log("result ::");
        // console.log(result[0].id);
        //Gives the result number
        res.redirect("/post/" + result[0].id);
    });
});

//PAGES OF INDIVIDUAL POSTS USE THIS LAYOUT
router.get('/post', function(req,res){
    res.render('post', {layout: 'main.handlebars'});
});

//SPECIFIC POST -- BY ID
router.get('/post/:id', function(req,res){
    let id = req.params.id;
    let comObj;
    // console.log("req: ");
    // console.log(req);
    // console.log("req.params.id: ");
    // console.log(req.params.id);
    if (isNaN(id)){
        console.warn(
            "Error: req.params.id has misfired; the id of '" + req.params.id +
            "' is not a number and has no accompanying page"
            );
    } else {
        cast.getComments(id, function(comData){
            comObj = {comments: comData};
            // console.log("comObj :", comObj);
            return comObj;
        });
        cast.getOne(id, function(data){ //Get obj w/ corresponding id
            let postsObj = {posts: data};
            let getObj = {
                postsObj: postsObj,
                comObj: comObj
            }
            //console.log("Object for GET request :", getObj);
            if (postsObj.posts.length !== 0){
                res.render('post', getObj); //COMBINE OBJ's
            } else { //If there is nothing in the post obj load newpost instead
                res.redirect("/newpost");
            }
        });
    }
});

//RANDOM ITEM FROM DB
router.get('/random', function(req, res){
    cast.getLast(function(result){
        // console.log("result ::");
        // console.log(result[0].id);
        let last = parseInt(result[0].id);
        let random = Math.floor(Math.random() * last) + 1;
        //Random number using last id in db
        res.redirect("/post/" + random);
    });
});

//||||||||||||||||||||||||||         ||||||||||||||||||||||||||||
//////////////////////////// WORKING ////////////////////////////

// COMMENT ROUTE
router.post("/post/comment", function(req, res){
    let postId  = req.body.postId;
    let nameInput = req.body.name;
    let emailInput = req.body.email;
    let commentInput = req.body.comment;

    cast.addComment([postId, nameInput, emailInput, commentInput], function(result) {
        // console.log(result);
        // console.log("comment added to db");
    });
});

//CHANGE SO THIS CAN DELETE A USER"S POSTS
router.delete("/posts/delete/:id", function(req, res) {

    let condition = "id = " + req.params.id;

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