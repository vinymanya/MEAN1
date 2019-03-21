const animals = require("../controllers/animals.js");

module.exports = function Routes(app, server, Animal){
    //handle routes here
    app.get("/", (request, response)=>{
        animals.show(request, response);
    });

    //handling route parameter:
    //the id is dynamic
    app.get("/animals/:id", (request, response)=>{
        animals.findOne(request, response);
    });

    //edit
    app.get("/animals/:id/edit", (request, response)=>{
        animals.edit(request, response);
    })

    //updating animal through the form
    app.post("/animals/:id", (request, response)=>{
        animals.update(request, response);
    })

    //delete animal
    app.get("/animals/:id/delete", (request, response)=>{
        animals.delete(request, response);
    });

    //display a form for making new animals
    app.get("/new", (request, response)=>{
        response.render("../client/views/animals/new");
    });

    //create animals through a form
    app.post("/animals", (request, response)=>{
        animals.create(request, response);
    })
}