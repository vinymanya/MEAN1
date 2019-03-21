function Ninja (name) {
  // create public attributes
  this.name = name
  this.health = 100
  // Create private attributes
  let speed = 3
  let strength = 3

  // Create public methods
  this.sayName = function () {
    console.log('My ninja name is ' + this.name)
    return this
  }

  this.showState = function () {
    console.log(`Name: ${this.name}, Speed: ${speed}, Strength: ${strength}, Health: ${this.health}`)
    return this
  }

  this.drinkSake = function () {
    this.health += 10
    return this
  }

  // Additional methods
  this.punch = function (ninjaInstance) {
    // Add validation: Check if the object that was passed in is an instance of Ninja
    if (ninjaInstance instanceof Ninja) {
      ninjaInstance.health -= 5
    }
    return this
  }

  this.kick = function (ninjaInstance) {
    if (ninjaInstance instanceof Ninja) {
      ninjaInstance.health -= 15
    }
    return this
  }
}

// Create new instances of 'Ninja'
let blueNinja = new Ninja('Goemon')
blueNinja.showState()

let redNinja = new Ninja('Bill Gates')
redNinja.punch(blueNinja).kick(blueNinja)

blueNinja.kick(redNinja)

blueNinja.showState()
redNinja.showState()
