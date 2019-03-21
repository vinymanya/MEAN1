//require express
const express = require("express");
	  bodyParser = require("body-parser");
	  port = process.env.PORT || 8000;
	  path = require("path");
	  app = express();
	  
//require mongoose module
const mongoose = require("mongoose");
const {Schema} = mongoose;

//set ejs for our template
app.set("view engine", "ejs");
//set the path to our views
app.set("views", path.join(__dirname, "views"));
//usage of body-parser
app.use(bodyParser.urlencoded({extended:true}));

//connect to the mongoDB database with mongoose through connect method
//also specify the name of database to use "animal"
mongoose.connect("mongodb://localhost/mongoose_dashboard");
//print out a message to know when mongoose is connected
mongoose.connection.on("connected", () => console.log(`mongoose is connected!`));

//lets create a schema for our database.
//this a blueprint for our collection
const animalSchema = new Schema({
	name:{
		type: String,
		required: [true, "Animal name is required!"], //customize error messages to display to users.
		minlength: [2, "Animal length must be at least 2"]
	},
	numberOfLegs: {
		type: Number,
		required: true
	},
	species: {
		type: String,
		required: [true, "You must provide animal species!"]
	},
	eatsPeople: {
		type: Boolean,
		default: false
	}
},{
	timestamps: true
});

//create a model for the above schema and pass in 
//the schema associated with the model that we want to create.
//the model method will return the actual model
mongoose.model("Animal", animalSchema);
//extract the model:
const Animal = mongoose.model("Animal");
	  //tell the server to start listening on the specified port.
	  server = app.listen(port, ()=> console.log(`Listening on port ${port}`));
	  //invoke the route file containing all the routes
	  routes = require("./routes/index.js")(app, server, Animal);











