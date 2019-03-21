// JS Library Assignment

// map return a new array as a result of calling the callback function
function map (array, callback) {
  const results = []
  for (let index = 0; index < array.length; index++) {
    // Invoke the callback function with each item in the array and optionally pass the index
    results.push(callback(array[index], index))
  }
  return results
}

const stringArray = ['3', '6', '9', 'orange', '4', '6', '8', 'mango']

// ES6 Anonymous function
console.log(map(stringArray, item => parseInt(item, 10)))

const numbersArray = [2, 4, 5, 6, 7778, 890]

/* Implicit return is done in three ways in JS: 
1.when a function doesn't return anything, 
2.when we use the keyword 'new' with 'this' in object constructor, 
3.When we use arrow function with the body.
*/

// The arrow function without the body has an implicit return
console.log(map(numbersArray, (item, index) => item + index))

// function add (item, index) {
//   return (item + index)
// }

// SYNCHRONOUS CODE: JS runs synchronously meaning it runs the code line by line or block by block.
// Example:
// console.log('Line 1')

// function sayHiToPerson (name) {
//   console.log(`Hi ${name}`)
// }
// sayHiToPerson('Viny')

// console.log('Line 2')

// //////////////////////////////////// Asynchronous Code Communication //////////////////////
// TO Make Our code ASYNCHRONOUS: We can use a function called setTimeout.
// Mostly used when querying DB

// Example 1:
console.log('Line 1')

function sayHiToPerson (name) {
  // setTimeout is going to put the code within the callback function for later execution.
  setTimeout(function () {
    console.log(`Hi ${name}`)
  }, 2000)
// continue...
}
sayHiToPerson('Viny')

console.log('Line 2')

// Example 2:
// 1. To pass data from the callback to the parent function you use a parameter.
// 2.	To pass data from the parent function to the callback you use a global variable.
function getItemsFromDB (query, callback) {
  setTimeout(function () {
    const data = ['item1', 'item2']
    callback(data)
  }, 500)
}

// Since we are using 'setTimeout', give this function a callback to execute when the data is available.
getItemsFromDB('select * from things;', function (data) {
  console.log('Inside the Callback', data)
  for (let index = 0; index < data.length; index++) {
    console.log(data[index])
  }
})
// console.log(things)

//  Order Supply Challenge
function orderSupplies (item, callback) {
  let warehouse
  const deliveryTime = Math.random() * 3000
  console.log('Delivery Time: ', deliveryTime)

  setTimeout(function () {
    warehouse = {
      paint: {
        product: 'Neon Green Paint',
        directions: function () {return 'mix it'}
      },
      brush: {
        product: 'Horsehair brush',
        directions: function () { return 'start painting!'}
      }
    }
    // Invoke the callback function here     
    callback(warehouse[item])
  }, deliveryTime)
}

// Make it more generic
function receivedItem (item) {
  console.log(`Received ${item.product} and we can now ${item.directions()}`)
}

// 'receivedItem' becomes our callback function
orderSupplies('paint', receivedItem)
orderSupplies('brush', receivedItem)

// Control the flow of information, no matter which one is received first,
// make sure we always print out the 'paint' first
