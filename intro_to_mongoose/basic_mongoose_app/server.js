// require express
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const port = process.env.PORT || 8000
const app = express()
// always require mongoose after the app variable
const mongoose = require('mongoose')
// Object destructuring
const {Schema} = mongoose
// connect Mongoose to MongoDB using the connect method:
mongoose.connect('mongodb://localhost:27017/basic_mongoose', {useNewUrlParser: true})

// create a database schema to model our collection
const UserSchema = new Schema({
  name: String,
  age: Number
})
// With the model method, we are setting the info.
mongoose.model('User', UserSchema); // we are setting this Schema in our Models as "User"
// With the model method, we are getting User model.
const User = mongoose.model('User'); // we are retrieving this Schema from our Models, named "User"

// specify the template engine to be used
app.set('view engine', 'ejs')
// usage of body-parser
app.use(bodyParser.urlencoded({extented: true}))
// path to serve static files
app.use(express.static(path.join(__dirname, 'static')))
// path for our views
app.set('views', path.join(__dirname, 'views'))

// Tell the server which port to listen to
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// requiring routes for our routes
const routes = require('./routes/index.js')(app, server, User)
