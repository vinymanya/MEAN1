module.exports = function Route(app, server){
    //require the socket module
    const io = require("socket.io").listen(server);
    //render the index view
    app.get("/", (request, response)=>{
        response.render("index");
    })
    //start listening and emitting data
    io.on("connection", (socket)=>{
        //listening to submitted_data
        socket.on("form_data", (data)=>{
            //generate a random number between 1 and 1000
            var random_number = Math.floor(( Math.random() * 1000) + 1);
            //emit data to the client
            socket.emit("server_response", {response: data});
            socket.emit("random_number", {response: random_number});
        })
    })
}