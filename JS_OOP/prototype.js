var MyObjConstructor = function (name) {
  var myPrivateVar = 'Hello'
  this.name = name
  this.method = function () {
    console.log('I am a method')
  }
}
var obj1 = new MyObjConstructor('object1')
var obj2 = new MyObjConstructor('object2')
console.log(obj1)

obj1.newProperty = 'newProperty'
obj1.__proto__.anotherProperty = 'anotherPrototype!'
console.log(obj1.anotherProperty)
console.log(obj1.newProperty)
// what about obj2?
console.log(obj2.newProperty)
console.log(obj2.anotherProperty)

// ES5 OOP Review
function Car (make, model) {
  var odometer = 0
  this.make = make
  this.model = model
  // To make functions private, we scope them to the constructor
  function updateOdometer (distance) {
    odometer += distance
  }

  // "Getter" functions help us read private variables
  this.readodometer = function () {
    return odometer
  }

  // "Setter" functions help us update private variables
  this.drive = function (distance) {
    updateodometer(distance)
    // return this will allow us to chain methods
    return this
  }
}
var my_car_instance = new Car('Chevy', 'Camaro')
// by returning this, we can chain drive()
my_car_instance.drive(50).drive(90)
// private variable is undefined
console.log(my_car_instance.odometer)
// but we can read it with our getter function
console.log(my_car_instance.readodometer)

class Dot {
  constructor (x, y) {
    this.x = x
    this.y = y
    console.log('You created a Dot!')
  }
}
let dot1 = new Dot(10, 10)
