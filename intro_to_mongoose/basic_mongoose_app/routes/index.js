module.exports = function Routes(app, server, User){
    //handle routes here
    app.get("/", (request, response)=>{
        //let modify the root route to display all the users
        //find is the method to fetch all the users from the database.  
    //     User.find({}, (error, users)=>{
    //         if(error){
    //             console.log(`users were not found!`);
    //         }else{
    //             console.log(`The operation was successful!`);
    //             response.redirect("/", {user_data: users})
    //         }
    //     })
        response.render("index");
    });

    app.get("/results", (request, response)=>{
        User.find({})
            .then(users =>{
                // console.log("Our users", users);
                response.render("result", {users});
            
            })
            .catch(console.log);
    });

    
    //posted data from the form
    app.post("/users", (request, response)=>{
        console.log("POST DATA", request.body);
        //This is where we would add the user from request.body to the database.
        const user = new User({name: request.body.name, age: request.body.age});
        //examine the new user
        // console.log(user);
        //try to save that new user into the db(This is the method that actually inserts into the db)
        //and run a callback function with an error if any from the operation
        user.save((error)=>{
            if(error){
                console.log(`Something went wrong!`);
            }else{
                console.log(`Successfully added a user!`);
                response.redirect("/results");
            }
        });
        
    })
}