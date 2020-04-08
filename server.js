var express = require("express"); //express dependency
var PORT = process.env.PORT || 8080; //define port
var app = express(); //initialize express application
var path = require('path'); 

//set environmet varibles
require("dotenv").config();
//For CSS
app.use(express.static(path.join(__dirname, '/public')));

//Parse application body JSON
app.use(express.urlencoded({extended: true})); //ALLOWS NESTED OBJECTS -- is this needed?
app.use(express.json()); //Recognize the JSON

var exphbs = require("express-handlebars"); //Pull in express handlebars dependency

app.engine("handlebars", exphbs({ defaultLayout: "main"})); // Register handlebars view engine
app.set("view engine", "handlebars"); //Use the view engine

//Import Routes
var routes = require("./controllers/cast-controller");
app.use(routes); //Recognize & use the routes

// ================~~~SERVER~~~~==================--------------------|  |===|===|| github.com/wsatchmo
// Start the server                                                 //|  |  _√_  || -Will S-
app.listen(PORT, () => {                                            //|  |<(¨v¨)>|| "Many things can happen in brains!"   
    console.log("Server listening on:: http://localhost:" + PORT);  //|  |  |U|  ||   "Time's coming near, almost there, never fear..."      
});                                                                 //|  |_______||     "You can think lots of stuff with brains!"
// ================~~~SERVER~~~~==================--------------------|  ~~GOBLIN~~ 