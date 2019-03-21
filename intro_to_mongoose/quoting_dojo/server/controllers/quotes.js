const mongoose = require('mongoose')
const Quote = mongoose.model('Quote')

module.exports = {
  show: function (req, res) {
    Quote.find({}, function (err, quotes) {
      res.render('../views/quotes/new', {quotes: quotes})
    })
  },
  create: function (req, res) {
    const quote = new Quote({name: req.body.name, quote: req.body.quote})
    quote.save(function (err) {
      if (!err) {
        res.redirect('/quotes')
      }else {
        console.log('something went wrong')
      }
    })
  }
}
