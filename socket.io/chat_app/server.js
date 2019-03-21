//require express
const express = require("express");
      bodyParser = require("body-parser");
      path = require("path");
      port = process.env.PORT || 8000;
      app = express();


//the template engine to be used is ejs
app.set("view engine", "ejs");
//usage of body-parser
app.use(bodyParser.urlencoded({extended:true}));
//indicate the path to the views
app.set("views", path.join(__dirname, "views"));
//indicate the path to serve static files
app.use(express.static(path.join(__dirname, "static")));


//tell the server to run on the specified port
const server = app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

//indicate and require the routes modules
//for the server to find all our routes
const routes = require("./routes/index.js")(app, server);