//require mongoose
const mongoose = require("mongoose");
//create the schema
const {Schema} = mongoose;
//let build a schema for our model
const quoteSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name field is required!"],
        minlength: [2, "Name must be at least 2 characters long!"]
    },
    quote: {
        type: String,
        required: [true, "Quote is required!"]
    }
},{
    timestamps: true
});

//register the schema as a model:
mongoose.model("Quote", quoteSchema);
const Quote = mongoose.model("Quote"); //retrieve the registered schema from the model