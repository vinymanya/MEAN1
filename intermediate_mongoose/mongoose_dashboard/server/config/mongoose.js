
//require mongoose
const mongoose = require("mongoose");
      fs = require("fs"); //fs modules for loading model files
      path = require("path"); //path for getting the models
//connect to the mongoDB database with mongoose through connect method
//also specify the name of database to use "animal"
mongoose.connect("mongodb://localhost/mongoose_dashboard");
//print out a message to know when mongoose is connected
mongoose.connection.on("connected", () => console.log(`mongoose is connected!`));

//create a variable that point to where all the models live.
const models_path = path.join(__dirname, "./../models");

fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf(".js") >= 0){
        //then we want to require the model
        require(models_path + "/" + file);
    }
});