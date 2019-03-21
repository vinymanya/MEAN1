// require express
const express = require('express')
// require body-parser middleware
const bodyParser = require('body-parser')
// require path to helps us locate our views
const path = require('path')
// specify a port for your server to run on
const port = process.env.PORT || 5000

// invoke express to return a new app
const app = express()

// set up the template engine
app.set('view engine', 'ejs')
// usage of body-parser
app.use(bodyParser.urlencoded({extended: true}))
// establish our path for the views
app.set(path.join(__dirname, './views'))
// static files
app.use(express.static(path.join(__dirname, './static')))

// tell the server to listen to the specified port
const server = app.listen(port, () => {
  console.log(`🚀 Listening on port ${port}...`)
})

// let specify the path to the route file
// route will handle all of our routing
const route = require('./routes/index.js')(app, server)
