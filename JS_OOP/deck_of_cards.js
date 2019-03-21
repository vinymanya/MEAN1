// Deck class
class Deck {
  constructor () {
    this.deck = []
  }
  // This should go back to the original order, they were first created   
  reset () {
    this.deck = []
    let suits = ['Clubs', 'Hearts', 'Diamonds', 'Spades']
    let pips = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King']

    for (let suit in suits) {
      for (pip in pips) {
        this.deck.push(pips[pip] + 'of' + suits[suit])
      }
    }
    return this
  }
  // Shuffle the Deck
  shuffle () {
    let i = this.deck.length, j , temp
    while(--i > 0){
      j = Math.floor(Math.random() * (i + 1))
      temp = this.deck[j]
      this.deck[j] = this.deck[i]
      this.deck[i] = temp
    }
    return this
  }

  deal () {
    return this.deck.pop()
  }

}
// Player Class
class Player {
  constructor (name) {
    this.name = name
    this.hand = []
  }

  draw (deck) {
    this.hand.push(deck.deal())
    return this
  }

  discard () {
    this.hand.pop()
    return this
  }
}
let deck2 = new Deck()
deck2.reset().shuffle()
console.log(deck2)

let player2 = new Player('Billy')
player2.draw(deck2).draw(deck2)
console.log(player2)
