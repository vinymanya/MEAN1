class Dot {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  showLocation () {
    // Rewrite this method so it reflects the appropriate name of the constructor
    console.log(`The ${this.constructor.name} is at x ${this.x} and y ${this.y}`)
  }

  // Add a static method
  static getHelp () {
    console.log(`The Dot class takes two coordinates X and Y`)
  }

  parentFunction () {
    console.log('This is coming from the parent function! ')
  }
}

// Create a child class that inherits from the above parent class
class Circle extends Dot {
  constructor (x, y, radius) {
    super(x, y)
    this.radius = radius
  }

  // We can also use 'super' to call parent methods
  childFunction () {
    const message = super.parentFunction()
    console.log(message)
  }
}

let dot2 = new Dot(6, 9)
dot2.showLocation()

// Instance of the child object
let circle1 = new Circle(12, 3, 7)
circle1.showLocation()
circle1.childFunction()
