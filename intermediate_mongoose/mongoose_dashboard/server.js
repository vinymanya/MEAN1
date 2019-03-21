//require express
const express = require("express");
	  bodyParser = require("body-parser");
	  port = process.env.PORT || 8000;
	  path = require("path");
	  app = express();

//set ejs for our template
app.set("view engine", "ejs");
//set the path to our views
app.set("views", path.join(__dirname, "views"));
//usage of body-parser
app.use(bodyParser.urlencoded({extended:true}));
//the path to serve static files
app.use(express.static(path.join(__dirname, "./static")));

//require mongoose configuration file which does the rest for us
require("./server/config/mongoose.js");

 //tell the server to start listening on the specified port.
const server = app.listen(port, ()=> console.log(`Listening on port ${port}`));
	  //invoke the route file containing all the routes
	  routes = require("./server/config/routes.js")(app, server);











