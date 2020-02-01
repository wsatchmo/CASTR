//express dependency
var express = require("express");  //Pull in express dependency
var exphbs = require("express-handlebars");  //Pull in express handlebars dependency
var PORT = process.env.PORT || 8080;
 //initialize express application
var app = express();

app.use(express.static("public"));

//Parse application body JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json()); //Recognize JSON Object

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

<<<<<<< HEAD
//Import routes
var routes = require("./controllers/cast-controller.js");
//Recognize & use the routes
app.use(routes);
=======
// var routes = require("./controllers/cast-controller.js");

// app.use(routes);
>>>>>>> 30ebe020e336262965da7e052e8d42d706e5f3c7

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost: ${PORT}")
});