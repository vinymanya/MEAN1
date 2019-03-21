//require express
const express = require("express");
      bodyParser = require("body-parser");
      path = require("path");
      port = process.env.PORT || 3000;
      app = express();
      mongoose = require("mongoose");

//template engine to be used
app.set("view engine", "ejs");
//path to our views to serve files
app.set("views", path.join(__dirname, "views"));
//usage of body-parser
app.use(bodyParser.urlencoded({extended:true}));

//define Schema variable
const {Schema} = mongoose;

//define Post Schema
const PostSchema = new mongoose.Schema({
    text : {
        type: String,
        comments: [{type: Schema.Type.ObjectId, ref:"Comment"}]
    }
},{
    timestamps: true
})

//define Comment Schema
const CommentSchema = new mongoose.Schema({
    _post: {
        type: Schema.Type.ObjectId, ref: "Post"
    },
    text: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

//set our models by passing them their respective Schemas
mongoose.model("Post", PostSchema);
mongoose.model("Comment", CommentSchema);
//store our models in variables
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

//route for getting a particular post and comment
app.get("/posts/:id", (request, response)=>{
    Post.findOne({_id: request.params.id})
    .populate("comments")
    .exec((error, post)=>{
        response.render("post", {post:post});
    });
});

//route for creating one comment with the parent post id
app.post("/posts/:id", (request, response)=>{
    Post.findOne({_id: request.params.id}, (error, post)=>{
        const comment = new Comment(request.body);
        comment._post = post._id;
        post.comments.push(comment);
        comment.save((error)=>{
            post.save((error)=>{
                if(error){ console.log("Error")}
                else{ response.redirect("/")}
            })
        })
    })
})