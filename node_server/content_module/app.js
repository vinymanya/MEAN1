// require http module
const http = require('http')

// specify the port for your server
const port = 8000

// require the static module from the current directory:
// this will return an object with a static method.
const static_contents = require('./static')()
console.log(static_contents)
// create the server:
const server = http.createServer(function (request, response) {
  static_contents.static(request, response) // This will serve static files automatically
})
server.listen(port)
console.log(`Running in localhost at port", ${port}`)
