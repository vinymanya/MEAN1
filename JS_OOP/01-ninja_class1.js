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
}

// Create new instances of 'Ninja'
let hayabusa = new Ninja('Hayabusa')
hayabusa.sayName()

let jokomo = new Ninja('Jokomo')
// Chain methods
jokomo.sayName().showState().drinkSake().showState()

hayabusa.drinkSake().drinkSake().showState()
