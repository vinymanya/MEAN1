const quotes = require("../controllers/quotes.js");
module.exports = function(app, server) {
    app.get('/', function(req, res) {
        res.render("../views/quotes/index");
    })
    app.post('/quotes', function(req,res){
        quotes.create(req, res);
    })
    app.get('/quotes', function (req, res) {
        quotes.show(req, res);
    })
}
