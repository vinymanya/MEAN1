const color = require('colors')

/*
Create middleware that reports information about the incoming http request.
Certain elements will be objects(body), display the key value pairs
Items to report iff they have values, use colors (external module):
method
hostname
ip
body
cookies
parameters
protocol
route
url
*/

module.exports = function (request, response, next) {
  // console.log('inside logger', request.method)
  // It's a good practice when building middleware to immediately call next
  const keys = ['method', 'hostname', 'ip', 'body', 'cookies', 'params', 'path', 'protocol', 'route', 'url']

  keys.forEach(key => {
    // console.log('key', key, request[key])
    const data = request[key]
    // check if there value
    if (data) {
      // check for the data type
      if (typeof data === 'object') {
        // check if object contains key value pairs
        if (Object.keys(data).length) {
          console.log(color.red(`The request ${key} has these properties:`))
          // loop through the keys of an object
          // for (const prop in data) {
          //   console.log(color.blue(`\t${prop} => ${data[prop]}`))
          // }

          // Object.entries will give us key and value at the same time inside an array
          // we can then use array destructuring.
          for (const [prop, value] of Object.entries(data)) {
            console.log(color.blue(`\t${prop} => ${value}`))
          }
        }
      }else {
        console.log(color.gray(`The request ${key} is ${data}`))
      }
    }
  })
  next()
}
