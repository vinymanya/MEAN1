const mongoose = require("mongoose");
      Animal = mongoose.model("Animal");

module.exports = {
    show: function(request, response){
        //Display all the animals from the database through our model
        Animal.find({})
        .then(animals =>{
            console.log("Retrieved animals")
            // console.log(animals);
            //render the index view
            response.render("../client/views/animals/index", {animals: animals})
        })
        .catch(error => console.log("Something went wrong!"));
    },
    findOne: function(request, response){
        Animal.findOne({_id: request.params.id}) //findOne is gonna find just one element with the matching id.
        .then(animal =>{
            console.log("The single animal retrieved!");
            response.render("../client/views/animals/show", {animal});
        })
        .catch(console.log);
    },
    edit: function(request, response){
        Animal.findOne({_id: request.params.id})
        .then(animal=>{
            response.render("../client/views/animals/edit", {animal})
        })
        .catch(error=>{
            console.log(error.errors);
        })
    },
    update: function(request, response){
        Animal.update({_id: request.params.id})
        .then(animal=>{
            response.redirect("/")
        })
        .catch(error=>{
            console.log(error.errors)
        })
    },
    delete: function(request, response){
        Animal.remove({_id: request.params.id})
        .then(animal=>{
            response.redirect("/")
        })
        .catch(error=>{
            console.log(error.errors)
        })
    },
    create: function(request, response){
        Animal.create(request.body)
        .then(animal =>{
            response.redirect("/");
        })
        .catch(error =>{
            //get errors and display them if any
            const errorMessages = Object.keys(error.errors).map(key => error.errors[key].message);
            response.render("../client/views/animals/new", {errors: errorMessages});

        })
    }
}