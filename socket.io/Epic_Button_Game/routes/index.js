module.exports = function Route (app, server) {
  // render the index view
  app.get('/', (request, response) => {
    response.render('index')
  })
  // require socket.io object for the connection
  const io = require('socket.io').listen(server)
  // let create a connection btwn the client and the server

  // initialize count variable to keep track of number of time
  // the button is being clicked!
  let count = 0
  io.on('connection', (socket) => {
    console.log(`Client/Server is now connected!`)
    console.log(`Client/Server connection id is: ${socket.id}`)
    // start listening and sending data now
    socket.on('buttonClick', () => {
      console.log(`The button has been clicked!`)
      updateNumber(++count)
    })
    socket.on('reset', function () {
      updateNumber(count = 0)
    })
    // make sure a new connection receives updates of the current number
    socket.emit('updateNumber', count)
  })

  function updateNumber (number) {
    io.emit('updateNumber', number)
  }
}
