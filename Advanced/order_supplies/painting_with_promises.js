// When a function is not returning anything at all, it's implicitly returning 'Undefined'.
function orderSupplies (item) {
  let warehouse
  const deliveryTime = Math.random() * 3000
  console.log('Delivery Time: ', deliveryTime)

  // Return promise so we can use the promise patern
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      warehouse = {
        paint: {
          product: 'Neon Green Paint',
          directions: function () {return 'mix it'}
        },
        brush: {
          product: 'Horsehair brush',
          directions: function () { return 'start painting!'}
        },
        tarp: {
          product: 'Large Tarp',
          directions: function () { return 'cover the floor!' }
        }
      }

      //  Check if the item exists
      if (item in warehouse) {
        // Resolve it.
        resolve(item)
      }else {
        // Otherwise reject it.
        reject(new Error(`${item} is not available!`))
      }
    }, deliveryTime)
  })
}

function receivedItem (item) {
  console.log(item.directions())
}

const paint = orderSupplies('paint')
const brush = orderSupplies('brush')
const tarp = orderSupplies('tarp')
const roller = orderSupplies('roller').catch()

// We can also simply them using the 'Promise' object with the '.all()' function
// The problem with promise.all() is that if one of them fails, then the whole promise fails.
// Promise.all([tarp, paint, brush])
//   .then(function (items) {
//     items.forEach(receivedItem)
//   })
//   .catch(function (error) {
//     console.log(error.message)
//   })

tarp
  // Handle tarp
  .then((item) => {
    receivedItem(item)
    return paint
  })
  // handle paint
  .then((item) => {
    receivedItem(item)
    return brush
  })
  // handle brush
  .then((item) => {
    receivedItem(item)
    return roller
  })
  // handle failure for all of the above
  .catch(handleError)

function handleError (error) {
  console.log(error)
}

// /////////////////////////////////////////OTHER SOLUTIONS////////////////////////////////////////
// SOLUTION #1: It doesn't scale
// orderSupplies('paint', function (item) {
//   receivedItem(item)
//   orderSupplies('brush', receivedItem)
// })

// SOLUTION #2: It doesn't scale
// let havePaint = false
// orderSupplies('paint', function (item) {
//   receivedItem(item)
//   havePaint = true
// })

// orderSupplies('brush', function (item) {
//   if (havePaint) {
//     receivedItem(item)
//   }else {
// setInterval will run every 50 milliseconds until the program finish executing
//     const timer = setInterval(() => {
//       console.log('Checking for paint......')
// Check havePaint
//  if (havePaint) {
//    receivedItem(item)
// Stop checking
//         clearInterval(timer)
//       }
//     }, 50)
//   }
// })

// TWICK or Improvement for above solution.
// orderSupplies('brush', checkHavePaint)

// function checkHavePaint (item) {
//   console.log('brush', item)
// Check if havePaint is true
// if (havePaint) {
// Return to stop the function of execution
//     return receivedItem(item)
//   }
// Repeatedly check for havePaint until it's true.
// console.log('checking for havePaint....')
// setTimeout takes two parameters, anything beyond that, will be passed into the function when the it's invoked. 
//   setTimeout(checkHavePaint, 50, item)
// }

// SOLUTION #3: It doesn't scale
// let havePaint = false
// let haveBrush = false

// orderSupplies('paint', function (item) {
//   console.log('..................PAINT................')

//   receivedItem(item)
// Check for haveBrush
//   if (haveBrush) {
//     return receivedItem(haveBrush)
//   }
//   havePaint = true
// })

// orderSupplies('brush', function (item) {
//   console.log('..................BRUSH................')
//   if (havePaint) {
//     return receivedItem(item)
//   }
// This will evaluate to true 
//   haveBrush = item
// })

// SOLUTION #4: The best one!
// What is a Promise in JS?
// You can think about it as a receipt for future content. Eventually When it's available, it will hand you over the content.

// const paint = new Promise(function (resolve, reject) {
//   orderSupplies('paint', resolve)
// })

// const brush = new Promise(function (resolve, reject) {
//   orderSupplies('brush', resolve)
// })

// paint
//   .then(function (item) {
//     receivedItem(item)
// We are nesting the brush inside successful paint to control the flow of information.
//     brush
//       .then(function (item) {
//         receivedItem(item)
//       })
//       .catch(function () {})
//   })
//   .catch(function () {})
