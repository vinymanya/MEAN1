module.exports = function Routes(app, server, Message, comment){
    //handle routes here
    app.get("/", (request, response)=>{
        // console.log("We are inside the root route!");
        //retrieve all the messages from db
        Message.find({}, false, true)
            .populate("_comments")
            .exec((error, messages)=>{
                response.render("index", {messages: messages});
            })
                response.render("index", {messages: messages});
    });

    //route for posting messages
    app.post("/message", (request, response)=>{
        const newMessage = new Message({name: request.body.name, message: request.body.message});
        newMessage.save()
            .then(()=>{
                console.log("The message was saved!");
                response.redirect("/");
            })
            .catch(error=>{
                console.log(`Something went wrong! ${error.errors}`);
                response.render("index", {errors: newMessage.error.errors});
            })
    });

    //route to handle comments
    app.post("/comment/:id", (request, response)=>{
        const message_id = request.body.id;
        Message.findOne({_id: message_id}, (error, message)=>{
            const newComment = new comment({name: request.body.name, text: request.body.text});
            //associate the comment to the appropriate message.
            newComment._message = message._id;
            Message.update({_id: message._id},{$push: {"_comments": newComment}}, (error)=>{

            });
            newComment.save()
                .then(()=>{
                    console.log(`Comment was added!`);
                    response.redirect("/");
                })
                .catch(error=>{
                    console.log("Error");
                    response.render("index", {errors: newComment.error.errors});
                })
        })
    })
}