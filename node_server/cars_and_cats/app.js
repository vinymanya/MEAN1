// let bring in the http module
const http = require('http')
// fs module allows to read and write contents or files
const fs = require('fs')
// Determine the port for the server to run:
const port = 7077
// create the server:
const server = http.createServer(function (request, response) {
  // divide the url in order to examine it better
  const splitURL = request.url.split('/')
  // print the request url in the console
  console.log(`Client's URL request: ${splitURL}`)
  const first_part = splitURL[1]
  // checkout the first part of the URL
  switch (first_part) {
    // if it's styles:
    case 'styles':
      // then serve css
      serverCSS(splitURL[2], response)
      break
    // for images
    case 'images':
      // serve a jpg image
      serveJPG(splitURL[2], response)
      break
    default:
      // server an HTML file if otherwise
      switch (splitURL[1]) {
        case 'cars': // if the first_part is car
          if (splitURL[2] === 'new') {
            serveHTML('new.html', response)
          }else {
            serveHTML('cars.html', response)
          }
          break
        case 'cats':
          serveHTML('cats.html', response)
          break
        default:
          // we don't recognize this URL --serve a 404!
          serve404(response)
      }
  }
})
// calling the help functions passing the response object and filename in most cases to each
function serveHTML (filename, response) {
  // Read a particular file
  fs.readFile(`views/${filename}`, 'utf8', function (errors, contents) {
    // check out for errors:
    if (errors) {return server404(response)}
    // Send an appropriate response to the browser:
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.write(contents)
    response.end()
  })
}

function serveCSS (filename, response) {
  // Read a particular file:
  fs.readFile(`stylesheets/${filename}`, 'utf8', function (errors, contents) {
    // let check if there are errors
    if (errors) { return serve404(response) }
    // send a response to the browser:
    response.writeHead(200, {'Content-Type': 'text/css'})
    response.write(contents)
    response.end()
  })
}

function serveJPG (filename, response) {
  // Read a particular file:
  fs.readFile(`images/${filename}`, function (errors, contents) {
    // check to see if there are any error
    if (errors) { return serve404(response) }
    // send a response to the browser:
    response.writeHead(200, {'Content-Type': 'image/jpg'})
    response.write(contents)
    response.end()
  })
}

function serve404 (response) {
  response.writeHead(404)
  response.end('File Not Found!')
}
// tell your server which port to run on:
server.listen(port, function () {
  console.log('Running the server at port', port)
})
