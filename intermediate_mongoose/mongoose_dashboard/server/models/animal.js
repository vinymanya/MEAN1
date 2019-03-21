//require mongoose
const mongoose = require("mongoose");
const {Schema} = mongoose;

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

//register the schema as a model
mongoose.model("Animal", animalSchema);
const Animal = mongoose.model("Animal");