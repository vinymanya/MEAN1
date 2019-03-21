let fs = require('fs')
let http = require('http')
let port = 7077
// create the server
let server = http.createServer(function server (request, response) {
  // print to see which url the client is requesting:
  console.log("The client's URL request:", request.url)
  // find out which file the request is looking for
  let file
  switch (request.url) {
    case '/':
      file = 'index.html'
      break
    case '/ninjas':
      file = 'ninjas.html'
      break
    case '/dojo/new':
      file = 'dojos.html'
      break
    default:
      file = null
      break
  }
  // send file or error to browser
  if (file !== null) {
    // using string interpolation in the first argument
    fs.readFile(`${file}`, 'utf8', function (errors, contents) {
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.write(contents)
      response.end()
    })
  }
  // in case the file is null
  else {
    response.writeHead(404)
    response.end(`Page Not Found 404!`)
  }
})
// tell the server which port to run on
server.listen(port, function () {
  console.log('Running on port:', port)
})
