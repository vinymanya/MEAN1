//Lets require express for our server
const express = require("express");
//body-parser: middleware
const bodyParser = require("body-parser");
//require path for our views: path is built-in node module
const path = require("path");
//specify a port for the server to run on
//use node's global variable called process and it has object called environment.
//this is going to look for the environment variable
const port = process.env.PORT || 8000; //the env variables are capitalized
//invoke express and it should return a new app
const app = express();
//extended allows us to setup complex objects in our views. 
app.use(bodyParser.urlencoded({ extended:true }));
//setup ejs as our template engine
app.set('view engine', 'ejs');
//setup a path for our views.
app.set("views", path.join(__dirname, "views"));
//__dirname global variable create a path to our project appropriately depending
//your operating system's path notation (mac or linux, window)
console.log(__dirname); // -> /Users/vinymanya/Desktop/MEAN/Express/test_Express

const names = ["John", "Alex", "Terra", "Nova"];
const context = {names:names};
//Lets handle routes
app.get("/", function(request, response){
    response.render("index");
});

app.post("/process", function(request, response){
    console.log(request.body);
    names.push(request.body.yourname);
    names.push(request.body.email);
    console.log(names);
    response.render("results", context);
});

//passing parameters in the url
app.get("/names/:id", function(request, response){
    console.log(request.params.id);
    response.send(names[request.params.id]);
})

//tell express to listen on the port
app.listen(port, function(){
    console.log(`Listening on port ${port}`);
})