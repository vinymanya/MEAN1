//require mongoose
const mongoose = require("mongoose");
//require the fs module for loading model files
const fs = require("fs");
//require path for getting the models
const path = require("path");
//connect to mongoose
mongoose.connect("mongodb://localhost/quoting_dojo");
mongoose.connection.on("connected", ()=> console.log(`mongoose is now connected!`));

//create a variable that point to the path where all of the modules live
const models_path = path.join(__dirname, "./../models");
//read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach((file)=>{
    if(file.indexOf(".js") >= 0){
        //require the files (this runs the model file which registers the schema
        require(models_path + "/" + file);
    }
})