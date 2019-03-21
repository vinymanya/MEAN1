// get the fs module for reading and writing contents
const fs = require('fs')

module.exports = function () {
  return {
    static: function (request, response) {
      // print to see which URL the client is requesting:
      console.log("The client's URL request is:", request.url)
      // This is how we create routes in node
      if (request.url === '/') {
        fs.readFile('views/index.html', 'utf8', function (errors, contents) {
          response.writeHead(200, {'Content-Type': 'text/html'})
          response.write(contents)
          response.end()
        })
      }else if (request.url === '/ninjas') {
        fs.readFile('views/ninjas.html', 'utf8', function (errors, contents) {
          response.writeHead(200, {'Content-Type': 'text/html'})
          response.write(contents)
          response.end()
        })
      }else if (request.url === '/styles') {
        fs.readFile('style.css', 'utf8', function (errors, contents) {
          response.writeHead(200, {'Content-Type': 'text/css'})
          response.write(contents)
          response.end()
        })
      }
      // if none of the above urls were matched:
      else {
        response.writeHead(404)
        response.end('File Not Found!')
      }
    }
  }
}
