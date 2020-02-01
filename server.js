//express dependency
var express = require("express");
//define port
var PORT = process.env.PORT || 8080;
 //initialize express application
var app = express();

app.use(express.static("public"));

//Parse application body JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json()); //Recognize JSON Object


var exphbs = require("express-handlebars"); //Pull in express handlebars dependency
//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Import routes
var routes = require("./controllers/cast-controller.js");
//Recognize & use the routes
app.use(routes);

app.listen(PORT, function(){
    console.log("Server listening on: http://localhost: ${PORT}")
});