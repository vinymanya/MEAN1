//require express
const express = require("express");
      bodyParser = require("body-parser");
      path = require("path");
      port = process.env.PORT || 8000;
      app = express();

const mongoose = require("mongoose");
const {Schema} = mongoose;
//configuration of body-parser
app.use(bodyParser.json());

//connect to mongoose
mongoose.connect("mongodb://localhost/api");
mongoose.connection.on("connected", ()=> console.log("mongoose is now connected!"));

//define schema
const apiSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

//make sure to register the schema as a new model
mongoose.model("Api", apiSchema);
const Api = mongoose.model("Api");

//create a few record
// const api = new Api({
//     name: "Yo Yo-Ma"
// });

// //save it in the db
// api.save()
//     .then(api => console.log("record was saved!", api))
//     .catch(error => console.log(error.errors));

//routes
app.get("/", (request, response)=>{
    response.json(
        Api.find({})
            .then(apis =>{console.log("found data!")})
            .catch(error => {console.log("something is wrong!")})
    )
});

app.get("/new/:name", (request, response)=>{
    // response.json(
        
    // //save it in the db
    // api.save()
    //     .then(api => console.log("record was saved!", api))
    //     .catch(error => console.log(error.errors)))
})

//tell the server to start listening on the specified port
const server = app.listen(port, ()=> console.log(`Listening on port ${port}`));
