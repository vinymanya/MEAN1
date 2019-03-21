// ES5 Syntax
function Dot (x, y) {
  this.x = x
  this.y = y
}
// Create a prototype method
Dot.prototype.showLocation = function () {
  console.log('The Dot is at x ' + this.x + ' and y ' + this.y)
}
// Instantiate Dot object
let dot1 = new Dot(3, 5)
dot1.showLocation()

// New ES6 Syntax 
class Dot2 {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
  showLocation () {
    console.log(`The Dot is at x ${this.x} and y ${this.y}`)
  }

  // Add a static method
  static getHelp () {
    console.log(`The Dot class takes two coordinates X and Y`)
  }
}

let dot2 = new Dot2(6, 9)
dot2.showLocation()

// Not accessible from the instance
// dot2.getHelp()

// Static methods are accessible directly from the class not the instance
Dot2.getHelp()
