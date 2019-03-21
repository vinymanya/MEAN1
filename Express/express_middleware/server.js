// require express
const express = require('express')
// require body-parser: our middleware
const bodyParser = require('body-parser')
// require path: node's built-in variable
const path = require('path')
// require our custom middleware
const logger = require('./server/middleware/logger')

// specify the port for the server to run on
// use the node's global environment variable
// Environment variables are good for deployment, as you will given one.
const port = process.env.PORT || 8000
// invoke express which returns a new app
const app = express()

const names = [
  'Micho',
  'Albert',
  'Olga',
  'Guy',
  'Pascaline',
  'Viny'
]
const context = {names: names}

// setup our path for the views
// __dirname is a global variable that establishes an absolute path from the root of our computer to our project appropriately.

// .set() method is used when we want to set something and .use() is used when we want to use something.
app.set(path.join(__dirname, 'views'))
// console.log(path.resolve('views')) // resolve always gives us the difference.
// setup ejs as our template engine
app.set('view engine', 'ejs')
// use body-parser: which is a middleware
// extended:true makes it so it can parse complex objects or nested objects.
app.use(bodyParser.urlencoded({extended: true}))

// basic custom middleware
app.use(function (request, response, next) {
  request.dateRequested = new Date()
  next()
})

// use the dataRequested function
app.use(dateRequested({errorIf: true}))

// use our middleware
app.use(logger)

function dateRequested ({ getOnly=true, errorIf=false, body =false, ignore=false } = {}) {
  console.log(getOnly, errorIf, body, ignore)
  // return a function to conform to our middleware interface
  return function (request, response, next) {
    if (ignore) {return next()}

    if (getOnly) {
      if (request.method !== 'GET') {
        let error = null
        if (errorIf) {
          error = new Error(`The request method ${request.method} is not supported`)
        }
        return next(error)
      }
    }

    if (body) {
      request.body.dateRequested = new Date()
    }else {
      request.dateRequested = new Date()
    }
    next()
  }
}

// lets handle routes
app.get('/', function (request, response) {
  console.log('Date inside Get', request.dateRequested)
  // console.log(request.body)
  response.render('index')
})

app.post('/process', function (request, response) {
  console.log(request.body)
  names.push(request.body.yourname)
  console.log(names)
  response.render('results', context)
})

// route with url dynamic parameter

app.get('/names/:index', function (request, response) {
  console.log(request.params)
  // get dynamic parameters through request.params object.
  response.send(`<h3>${names[request.params.index]}</h3>`)
})
// tell the server to listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
