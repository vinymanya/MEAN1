//require express
const express = require("express");
//require body-parser
const bodyParse = require("body-parser");
//specify the port for your server to run on
const port = process.env.PORT || 5000;
//require the global node's variable called path
const path = require("path");
//invoke express which will return a new app
const app = express();


//specify the template engine
app.set("view engine", "ejs");
//usage of body-parser
app.use(bodyParse.urlencoded({extended:true}));
//establish a path to our views
app.set("views", path.join(__dirname, "views"));
//static files path
app.use(express.static(path.join(__dirname, "static")));

//handling routes here:
//root route
app.get("/", function(request, response){
    response.render("index");
})


//tell the server to listen on the specified port.
//configuring server side socket.
const server = app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});
//the line bellow will return a new io object 
//which we can use to control socket server.
const io = require("socket.io").listen(server);

io.sockets.on("connection", function(socket){
    console.log("Client/socket is connected");
    console.log("Client/socket id is:", socket.id);
    //all the server socket code goes here.
    socket.on("button_clicked", function(data){
        console.log("Someone clicked a button! Reason:" + data.reason);
        socket.emit("server_response", {response: "sockets are the best!"});
    })
})