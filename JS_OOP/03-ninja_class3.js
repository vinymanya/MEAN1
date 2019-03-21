// Part I
class Ninja {
  constructor (name) {
    this.name = name
    this.health = 100
    this.speed = 3
    this.strength = 3
  }
  // This should log that Ninja's name
  sayName () {
    console.log(`My name is ${this.name}`)
  }
  // This should show the Ninja's Strength and Speed, as well as their health
  showStats () {
    console.log(`Strength: ${this.strength} Speed: ${this.speed} Health: ${this.health}`)
  }
  // This should add +10 Health to the Ninja
  drinkSake () {
    this.health += 10
    return this
  }
}

// Part II
// let ninja1 = new Ninja("Jokomo")
class Sensei extends Ninja {
  constructor (name) {
    super(name)
    this.speed = 10
    this.strength = 10
    this.wisdom = 10
    this.health = 200
  }
  // calling the drinkSake method from within speakWisdom
  speakWisdom () {
    let message = super.drinkSake()
    console.log(message)
    console.log('What one programmer can do in one month, \ntwo programmers can do in two months')
  }

  // rewrite showstats method to put it in the context of Sensei 
  // and add new attribute
  showStats () {
    console.log(`Strength: ${this.strength} Speed: ${this.speed} Health: ${this.health} Wisdom: ${this.wisdom}`)
  }
}
let super_sensei = new Sensei('Master Splinter')
console.log(super_sensei)
super_sensei.speakWisdom()
super_sensei.showStats()
