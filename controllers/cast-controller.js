var express = require("express");

var router = express.Router();

var food = require("../models/cast.js");

router.get("/", function(req, res) {
    cast.all(function(data) {
        var hbsObject = {
            cast: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/cast", function(req, res){
    cast.create([
        "name", "cast"
    ], [
        req.body.name, req.body.eaten
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

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