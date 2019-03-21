//require express first
const express = require("express");
      bodyParser = require("body-parser");
      path = require("path");
      port = process.env.PORT || 5000;
      app = express();

//specify the engine for the template
app.set("view engine", "ejs");
//set the path to the views folder
app.set("views", path.join(__dirname, "./client/views"));
//usage of body-parser
app.use(bodyParser.urlencoded({extended: true}));
//set the path to serve static files
app.use(express.static(path.join(__dirname, "./client/static")));

//require the mongoose configuration file which does the rest for us
require("./server/config/mongoose.js");
//tell the server to start listening to the specified port
const server = app.listen(port, ()=> console.log(`Listening on port ${port}`));
      //require the route file that handles all routes
      routes_setter = require("./server/config/routes.js")(app, server);


