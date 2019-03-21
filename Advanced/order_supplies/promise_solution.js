function orderSupplies (item) {
  var warehouse // undefined
  var deliveryTime = Math.random() * 3000

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      warehouse = {
        paint: {
          product: 'Neon Green Paint',
          directions: function () { return 'mix it!' }
        },
        brush: {
          product: 'Horsehair brush',
          directions: function () { return 'start painting!' }
        },
        tarp: {
          product: 'Large Tarp',
          directions: function () { return 'cover the floor!' }
        }
      }
      if (warehouse[item]) {
        resolve(warehouse[item])
      }else {
        reject(new Error(`${item} is not available`))
      }
    }, deliveryTime)
  })
}

function displayItem (item) {
  console.log(`I received a ${item.product}. Time to ${item.directions()}`)
}

//
var paint = orderSupplies('paint')
var brush = orderSupplies('brush')
var tarp = orderSupplies('tarp')
// var roller = orderSupplies('roller').catch(handleError)

tarp
  .then(displayItem)
  .then(function () {
    return paint.then(displayItem)
  })
  .then(function () {
    return brush.then(displayItem)
  })
  //   .then(function () {
  //     return roller.then(displayItem)
  //   })
  .catch(handleError)

function handleError (error) {
  console.log(error)
}
