module.exports = function Routes (app, server) {
  // render the index view
  app.get('/', (request, response) => {
    response.render('index')
  })
  // we need two arrays to store information.
  let users = []
  connections = []
  // require socket module and attach it to the server
  const io = require('socket.io').listen(server)
  // configure the socket connection here:
  io.sockets.on('connection', (socket) => {
    console.log('Client/server is now connected!')
    console.log(`Client/server connection id is: ${socket.id}`)
    // push data into connections array
    connections.push(socket)
    console.log('Connected: %s user(s) connected', connections.length)

    // start sending/emitting data and listenning to events:
    socket.on('disconnect', (data) => {
      // logoff the disconnected user
      users.splice(users.indexOf(socket.username), 1)
      // call updateUsernames to reflect the disconnection to all connected sockets.
      updatesUsernames()
      // disconnect: use splice to empty an array.
      connections.splice(connections.indexOf(socket), 1)
      // print to show how many are still connected:
      console.log('Disconnected: %s socket(s) connected', connections.length)
    })
    // sending messages
    socket.on('send_message', (data) => {
      // console.log(data)
      io.emit('new_message', {msg: data, user: socket.username})
    })
    // new user
    socket.on('new_user', (data, callback) => {
      callback(true)
      socket.username = data
      users.push(socket.username)
      updatesUsernames()
    })
    function updatesUsernames () {
      io.emit('get_users', users)
    }
  })
}
