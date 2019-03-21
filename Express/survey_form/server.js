// require express
const express = require('express')
// require body-parser middleware
const bodyParser = require('body-parser')
// require path to helps us locate our views
const path = require('path')
// specify a port for your server to run on
const port = process.env.PORT || 3000
// require session
const session = require('express-session')
// invoke express to return a new app
const app = express()

// configuration option for session
const sessionOtpions = {
  secret: 'somesecretkey%^&*~!@#',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}
// set up the template engine
app.set('view engine', 'ejs')
// usage of session
app.use(session(sessionOtpions))
// usage of body-parser
app.use(bodyParser.urlencoded({extended: true}))
// establish our path for the views
app.set(path.join(__dirname, 'views'))
// static files
app.use(express.static(path.join(__dirname, 'static')))

// result route
const route = require('./routes/index.js')(app); // passin the app as an argument.

// tell the server to listen to the specified port
app.listen(port, () => console.log(`Listening on port ${port}...`))
