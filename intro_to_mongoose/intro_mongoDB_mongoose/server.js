//require express
const express = require("express");
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



//connect to the mongoDB database with mongoose through connect method
//also specify the name of database to use "animal"
mongoose.connect("mongodb://localhost/animal");
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
	numberOfLegs: Number,
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
const Animal = mongoose.model("Animal", animalSchema);

//populate the model with some info
// const animal = new Animal({
// 	name: "Owl",
// 	numberOfLegs: 2,
// 	species: "herbivor", 
// 	// eatsPeople: false //we don't need to specify this field since there is default value.
// });

// animal.save()
// 	.then(animal => {
// 		console.log("The animal is saved!");
// 		console.log(animal);
// 	})
// 	.catch(error => {
// 		console.log("There is an error");
// 		console.log(error.errors.species.message);
// 		console.log(animal);
		
// 		//One way to handle errors more appropriately
// 		// const errorMessages = [];
// 		// const keys = Object.keys(error.errors);
// 		// //examine the keys
// 		// console.log(keys);

// 		// //loop through the keys
// 		// for(let index = 0; index < keys.length; index++){
// 		// 	errorMessages.push(error.errors[keys[index]].message);
// 		// }


// 		//Another way of handling error messages
// 		//map takes an array of objects and returns the values of whatever key that you pass into it.
// 		const errorMessages = Object.keys(error.errors).map(key => error.errors[key].message);

// 		console.log(errorMessages);

// 	})

//handle routes here
app.get("/", (request, response)=>{
	console.log("We are inside root!");
	//we can retrieve data from the database through our model
	Animal.find({})
		.then(animals =>{
			console.log("Retrieved animals");
			console.log(animals);
			//render the index view
			response.render("animals/index", {animals});
		})
		.catch(console.log("Something went wrong!"));
});

//handling route parameter:
//the id is dynamic
app.get("/animals/:id", (request, response)=>{
	Animal.findOne({_id: request.params.id}) //findOne is gonna find just one element with the matching id.
		.then(animal =>{
			console.log("Single animal", animal);
			response.render("animals/show", {animal});
		})
		.catch(console.log);
});

//create animals through a form
app.post("/animals", (request, response)=>{
	Animal.create(request.body)
		.then(animal =>{
			response.redirect("/");
		})
		.catch(error =>{
			//do as above!
			const errorMessages = Object.keys(error.errors).map(key => error.errors[key].message);
			console.log(Object.keys(error.errors))
			response.render("animals/new", {errors: errorMessages});

		})
})

//tell the server to start listening on the specified port.
app.listen(port, ()=> console.log(`Listening on port ${port}`));











