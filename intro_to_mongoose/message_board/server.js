//require express
const express = require("express");
      bodyParser = require("body-parser");
      path = require("path");
      port = process.env.PORT || 8000;
      app = express();
      mongoose = require("mongoose");

//template engine to be used
app.set("view engine", "ejs");
//specify the path to serve our views
app.set("views", path.join(__dirname, "views"));
//use body-parser
app.use(bodyParser.urlencoded({extended:true}));

//lets create our Shema for
const {Schema} = mongoose;

//define our message schema here
const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty", "Name must be at least 4 characters!"]
    },
    message: {
        type: String,
        required: [true, "Message cannot be blank!"]
    },
    _comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
}, {
    timestamps:true
})

//define our comment schema here
const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty!"]
    },
    text: {
        type: String,
        required: [true, "You need to include some text for the comment!"]
    },
    _message: {type: Schema.Types.ObjectId, ref: "Message"}
},{
    timestamps:true
})

//create an association with the schemas
mongoose.model("Message", MessageSchema);
mongoose.model("Comment", CommentSchema);
//extract the model from the schemas
const Message = mongoose.model("Message");
const comment = mongoose.model("Comment");

//tell the server to start listening on the specified port
const server = app.listen(port, ()=> console.log(`Listening on port ${port}`));

//since we are going to use a different file to handle our routes
//lets require routes and pass in the server to establish the connection
const routes = require("./routes/index.js")(app, 
    server,
    Message,
    comment
);