// require express
const express = require('express')
// require body-parser: middleware
const bodyParser = require('body-parser')
// require path to establish a path to our views
const path = require('path')
// specify the port for the server to run on
// using node's global variable called process and it has env obj and it gonna look for
// environment variable called PORT or use 8000.
const port = process.env.PORT || 8000
// require express-session to use session
const session = require('express-session')
// invoke express to return a new app
const app = express()

// Define options for session
const sessionOptions = {
  secret: 'somesecretkey908712',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}
// set the view engine to be used
app.set('view engine', 'ejs')
// define the path to find your views
app.set(path.join(__dirname, 'views'))
// usage of body-parser
app.use(bodyParser.urlencoded({extended: true}))
// usage of session: it needs a random string as secret key for encryption
app.use(session(sessionOptions))

// function that returns session data
function sessionData (request) {
  return {
    userName: request.session.userName,
    visitCount: request.session.visitCount
  }
}

// root route
app.get('/', function (request, response) {
  if (!request.session.userName && !request.session.visitCount) {
    request.session.userName = 'Viny'
    request.session.visitCount = 1
    response.render('index', sessionData(request))
  }else {
    request.session.visitCount += 1
    response.render('index', sessionData(request))
  }
})

// Ninja Level 1: route for reloading and incremeting session by 2
app.get('/reload', function (request, response) {
  // reload the page and refresh the session store
  request.session.reload(function (error) { /*some code here*/})
  // increment session visitCount by two
  request.session.visitCount += 2
  response.render('index', sessionData(request))
})

// Ninja Level 2: route for resetting session back to 1
app.get('/reset', function (request, response) {
  // reset session visitCount
  request.session.visitCount = 1
  response.render('index', sessionData(request))
})

// tell the server to listen to the specified port
app.listen(port, () => console.log(`Listening on port ${port}...`))
