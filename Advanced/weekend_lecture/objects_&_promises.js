// How do we create objects in JS other than object literals.
function Person (name) {
  this.name = name
}

// This method is created once and it's there for each instance. This saves memory space and improves performance. Every instance will have access the prototype method or property.
Person.prototype.sayHello = function () {
  // 'this' keyword will be available to the instance of the class/constructor function.
  console.log(`Hello, my name ${this.name}`)
}

const person = new Person('Viny')
person.sayHello()

// ////////////////////////////// Inheritance in JS --> ES5 ///////////////////////////
// EXAMPLE #1:
function Parent (name) {
  // Call the parent constructor function within this class.
  // Change the context in which we are calling this. Call the call function so that 'this' becomes 'Parent' rather than 'Person'.

  // The call method takes:
  // 1. The object to be used as the current object.
  // 2. A list of arguments to be passed to the method.
  Person.call(this, name) // NB:This method of inheritance only get the properties, it doesn't get the prototype chain.
}

// Assign the prototype object of parent to child prototype. To make sure we can access prototype methods of the parent constructor function.
Parent.prototype = Object.create(Person.prototype)

const parent = new Parent('Judith')
// The constructor function of the child is still referencing the parent once we log it.
// You can fix that by doing this.
Parent.prototype.constructor = Parent

// Create a prototype method for this object constructor.
Parent.prototype.assignChores = function (chore) {

  // Return a promise
  return new Promise(function (resolve, reject) {
    //   Make it asynchronous with setTimeout
    setTimeout(function () {
      // Check the chore directly
      if (chore.task) {
        resolve(chore.payment)
      }else {
        reject(new Error(chore.punishment))
      }
    }, random(2000))
  })
}

// Create  helper functions
function random (arrayOrNumber) {
  return Math.floor(
    Math.random() * (Array.isArray(arrayOrNumber) ? arrayOrNumber.length : arrayOrNumber)
  )
}
// Handle random punishments
function randomPunishments () {
  const punishments = ['go to bed early', 'birthday gift taken away', 'No electronics']
  return punishments[random(punishments)]
}

// Handle random chores
function randomChores () {
  const chores = ['dishes', 'mowing lawn', 'laundry', 'dusting']
  return chores[random(chores)]
}

console.log(Parent)
parent.sayHello()

// create Chore constructor function to handle tasks.
// This is an interface describing the chore information. 
function Chore () {
  this.task = randomChores()
  this.completed = false
  this.payment = random(100)
  this.punishment = randomPunishments()
}

// EXAMPLE #2:
function Child (name) {
  Parent.call(this, name)

  this.savings = 0
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

// prototype method for making the child do chore. Assigned by the parent
Child.prototype.doChores = function (chore, promiseOfPaymentOrPunishment) {
  chore.completed = random(100) > 50

  // save context of 'this' in a variable
  // const self = this

  promiseOfPaymentOrPunishment
    // Use the Fat arrow function to avoid loosing context of 'this'.
    // Note: The Fat arrow function will maintain the context of 'this'.
    .then(payment => {
      console.log(`${this.name} successfully completed ${chore.task} and receives ${payment}`)
      // Add payment to child savings. 
      // Note: the context of 'this' inside this function is different, because 'this' is a new scope even though we are inside the prototype method.
      this.savings += payment
    })
    .catch(error => {
      console.log(`${this.name} failed to complete ${chore.task} and must have ${error.message}`)
    })
}

// Prototype method for viewing child savings
Child.prototype.viewSavings = function () {
  console.log(`${this.name} has ${this.savings} dollars saved!`)
}

// Create a new child instance
const child = new Child('Sarah')

// Assign random chores to child 5 times.
for (let index = 0; index < 5; index++) {
  // Create a new Chore to send everytime.
  const chore = new Chore()
  // Call the parent prototype method and assignChores to child.
  child.doChores(chore, parent.assignChores(chore)) // the parent now need the same chore info.
}
// View Child savings after 2100 milliseconds.
setTimeout(function () {
  child.viewSavings()
}, 2100)
