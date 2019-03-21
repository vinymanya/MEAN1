// get the http module:
const http = require('http')
// fs module allows us to read and write content for responses
const fs = require('fs')

// creating a server using http module:
const server = http.createServer(function (request, response) {
  // see what URL the clients are requesting:
  console.log('client request URL:', request.url)
  // this is how we do routing in node:
  if (request.url === '/') {
    fs.readFile('index.html', 'utf8', function (errors, contents) {
      response.writeHead(200, {'Content-Type': 'text/html'}) // send data about response
      response.write(contents) // send response body
      response.end() // finished
    })
  }
  // In case request didn't match anything:
  else {
    response.writeHead(404)
    response.end('File not found!')
  }
})

const port = 8080
// tell your server which port to run on
server.listen(port)
// print out the server message
console.log(`Running in localhost at port ${port}`)
