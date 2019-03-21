module.exports = function Route(app){
    //root route or index route
    app.get("/", function(request, response){
        response.render("index");
    })
    //processing posted data from the survey
    app.post("/result", function(request, response){
        submitted_data = {
            name: request.body.yourname,
            dojolocation: request.body.dojolocation,
            fav_language: request.body.fav_language,
            comment: request.body.comment
        };
        response.render("result", {user_data: submitted_data});
    })
}