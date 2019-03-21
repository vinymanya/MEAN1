const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const {Schema} = mongoose

const app = express()

// establish the connection to mongoDB with mongoose
mongoose.connect('mongodb://127.0.0.1:27017/books_and_authors', {useNewUrlParser: true})
// listen for connection to the mongoDB databse server
mongoose.connection.on('connected', () => console.log(`Connected to mongoDB...`))

// create schemas
const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  age: Number,
  isAlive: {
    type: Boolean,
    default: true
  },
  // Adding relationship
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
}, {
  timestamps: true
})

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 2
  },
  // adding relationship
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author' // related model
  },
  pages: Number,
  year: Number,
  publisher: String
}, {
  timestamps: true
})

// register models
const Author = mongoose.model('Author', authorSchema)
const Book = mongoose.model('Book', bookSchema)

// set ejs as our view engine
app.set('view engine', 'ejs')
// specify the path to find ejs templates
app.set(path.join(__dirname, 'views'))
// specify the path for sinding static contents
app.set(express.static(path.join(__dirname, 'static')))
// use body-parser middleware for parsing through complex objects
app.use(bodyParser.urlencoded({extended: true}))

app.set('host', '0.0.0.0')
app.set('port', process.env.PORT || 5000)

// routing definitions for authors
app.get('/', function (request, response) {
  response.render('index')
})

app.get('/authors', function (request, response) {
  Author.find({})
    // populate the 'books' field for the author
    .populate('books')
    .then(authors => {
      response.render('authors/index', {authors})
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/authors/new', function (request, response) {
  response.render('authors/new')
})

app.post('/authors', function (request, response) {
  Author.create(request.body)
    .then(author => {
      console.log('New Author', author)
      // redirects are always get requests
      response.redirect('/authors')
    })
    .catch(error => {
      console.log('Error', error)
    })
})

// routing definition for books
app.get('/books', function (request, response) {
  Book.find({})
    // specify the related field that needs to be populated.
    .populate('author') // the author field will be populated with appropriate data.
    .then(books => {
      console.log(books)
      response.render('books/index', {books})
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/books/new', function (request, response) {
  Author.find({})
    .then(authors => {
      response.render('books/new', {authors})
    })
    .catch(error => {
      console.log(error)
    })
})

app.post('/books', function (request, response) {
  Book.create(request.body)
    .then(book => {
      // Associate this book with the author.
      // Find author by id.
      return Author.findById(book.author) // book.author is an id.
        .then(author => {
          author.books.push(book) // populate books field.
          return author.save() // save author since we have modified its info.
            .then(() => {
              response.redirect('/books')
            })
        })
    })
    // Since we are returning, .catch() method is gonna catch errors for book creation failure, author findById failure and save failure.
    .catch(error => {
      console.log(error)
    })
})

const server = app.listen(app.get('port'), () => console.log(`server is running on port ${server.address().port}`))
