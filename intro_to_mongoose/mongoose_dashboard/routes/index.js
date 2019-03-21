module.exports = function Routes(app, server, Animal){
    //handle routes here
    app.get("/", (request, response)=>{
        //Display all the animals from the database through our model
        Animal.find({})
            .then(animals =>{
                console.log("Retrieved animals", animals)
                // console.log(animals);
                //render the index view
                response.render("animals/index", {animals})
            })
            .catch(error => console.log("Something went wrong!"));
    });

    //handling route parameter:
    //the id is dynamic
    app.get("/animals/:id", (request, response)=>{
        Animal.findOne({_id: request.params.id}) //findOne is gonna find just one element with the matching id.
            .then(animal =>{
                console.log("The single animal retrieved!");
                response.render("animals/show", {animal});
            })
            .catch(console.log);
    });

    //edit
    app.get("/animals/:id/edit", (request, response)=>{
        Animal.findOne({_id: request.params.id})
            .then(animal=>{
                response.render("animals/edit", {animal})
            })
            .catch(error=>{
                console.log(error.errors);
            })
    })

    //updating animal through the form
    app.post("/animals/:id", (request, response)=>{
        Animal.update({_id: request.params.id})
            .then(animal=>{
                response.redirect("/")
            })
            .catch(error=>{
                console.log(error.errors)
            })
    })

    //delete animal
    app.get("/animals/:id/delete", (request, response)=>{
        Animal.remove({_id: request.params.id})
            .then(animal=>{
                response.redirect("/")
            })
            .catch(error=>{
                console.log(error.errors)
            })
    });

    //display a form for making new animals
    app.get("/animals/new", (request, response)=>{
        response.render("animals/new");
    });

    //create animals through a form
    app.post("/animals", (request, response)=>{
        Animal.create(request.body)
            .then(animal =>{
                response.redirect("/");
            })
            .catch(error =>{
                //get errors and display them if any
                const errorMessages = Object.keys(error.errors).map(key => error.errors[key].message);
                response.render("animals/new", {errors: errorMessages});

            })
    })
}