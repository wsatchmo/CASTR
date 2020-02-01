var express = require("express");
var router = express.Router();
var cast = require("../models/cast.js");


//CHANGE TO GET DATA FROM THE DB TO POST ONTO HOME PAGE
router.get("/", function(req, res) {
    cast.all(function(data) {
        var hbsObject = {
            cast: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

//CHANGE SO THIS CAN POST FROM A USER [OR ANON]
router.post("/api/cast", function(req, res){
    cast.create([
        "name", "cast"
    ], [
        req.body.name, req.body.eaten 
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

//CHANGE SO THIS CAN EDIT A USER'S POSTS
router.put("/api/cast/:id", function(req, res){
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    cast.update({
        castr: req.body.eaten
    }, condition, function(result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//CHANGE SO THIS CAN DELETE A USER'S POSTS
router.delete("/api/cast/:id", function(req, res) {
    var condition = "id = " + req.params.id; 
  
    cast.delete(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
module.exports = router;