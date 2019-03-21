//let require express
const express = require("express");
      bodyParser = require("body-parser");
      path = require("path");
      port = process.env.PORT || 8000;
      //invoke the express app which will return a new app
      app = express();

//specify the template engine to be used
app.set("view engine", "ejs");
//usage body-parser which is our middleware
app.use(bodyParser.urlencoded({extended:true}));
//setup the path to serve the views
app.set("views", path.join(__dirname, "views"));
//specify the path for serving static files
app.use(express.static(path.join(__dirname, "static")));


//tell the server to start listening on the specified port
const server = app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});

//require our routes file that handles all the routes
const routes = require("./routes/index.js")(app, server);