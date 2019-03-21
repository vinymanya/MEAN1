// Load the express module
// Express is just a node module
const express = require('express')
// let now invoke the module
const app = express()
// require express-session
const session = require('express-session')

// require body-parser
var bodyParser = require('body-parser')
// The usage
app.use(bodyParser.urlencoded({extended: true}))
// This is the line that tells our server to use the "/static" folder for static content

// usage of express-session
app.use(session({secret: 'somerandomkey!'}))

app.post('/users', function (req, res) {
  // set the name property of session.  
  req.session.name = req.body.name
  console.log(req.session.name)
  // code to add user to db goes here!
  // redirect the user back to the root route. 
  res.redirect('/')
})

app.use(express.static(__dirname + '/static'))

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views')
// Now lets set the view engine itself so that express knows we are using ejs
// opposed to another templating engine like jade.
app.set('view engine', 'ejs')

// Redirecting
app.post('/users/new', function (request, response) {
  // some code to process data from the form goes here
  // Then redirect to the root route
  response.redirect('/'); // just specify the url where you want to go.
})

app.post('users', function (request, response) {
  console.log('POST DATA \n\n', response.body)
  // code to add user to db goes here!
  // redirect the user back to root route.
  response.redirect('/')
})
// printing __dirname
console.log(__dirname); // This helps us create a path to our our project folder.

// lets handle the base route "/" and respond with "Hello Express"
app.get('/', function (request, response) {
  // printing the request object
  // console.log(response)
  response.render('main')
})

app.get('/style', function (request, response) {
  response.send(style.css)
})

// adding a new route
app.get('/users', function (request, response) {
  // hard coded user data
  var users_array = [
    {name: 'Michael', email: 'michael@codingdojo.com'},
    {name: 'Jay', email: 'jay@codingdojo.com'},
    {name: 'Brendan', email: 'brendan@codingdojo.com'},
    {name: 'Andrew', email: 'andrew@codingdojo.com'}
  ]
  response.render('users', {users: users_array})
})

// tell the express server to start listening to a particular port
app.listen(8000, function () {
  console.log('Listening on port 8000')
})
