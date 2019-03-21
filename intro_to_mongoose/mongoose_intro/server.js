const mongoose = require('mongoose')
const { Schema } = mongoose

// Establish a connection to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/animals', {useNewUrlParser: true})
// listen to connections
mongoose.connection.on('connected', () => console.log('Mongoose is connected!'))

// create animals schema
const animalsSchema = new Schema({
  name: String,
  // when giving properties option object it needs type.
  age: {
    type: Number, // type is required
    required: [true, 'Age field is required!'] // custom validation message
  },
  numberOfLegs: {
    type: Number,
    required: [true, 'Number of legs is required!'],
    min: 2
  },
  eatsPeople: {
    type: Boolean,
    default: false // Optional:if this field is not supplied use false.
  }
})
// set the schema as Animal
mongoose.model('Animal', animalsSchema)
// get schema from model
const Animal = mongoose.model('Animal')

// Create instances. This will be supplied through the form.
const animal = new Animal({
  name: 'Milou',
  age: 2,
  numberOfLegs: 4,
  eatsPeople: false
})

// Every instance created from a mongoose schema has a method called 'save'.
// Callbacks are typically error-first, that means you get the error first and any other data comes along is second.

// 1. Using a callback to save records in the database.
// animal.save(function (error, savedAnimal) {
//   console.log(error, savedAnimal)
// })

// 2. Another way of saving data is using Promises.
animal.save()
  .then(function (animal) {
    // do something here
    console.log(`Saved animal successfully: ${animal}`)
  })
  .catch(function (error) {
    // handle error here
    // console.log(`An error occured: ${error.errors}`)

    // Object.keys returns an array of keys from the object we give it, we can then chain it with .map() method...using fat arrow function we have an implicit return.
    const errors = Object.keys(error.errors).map(key => error.errors[key].message)
    console.log(errors)

  //     for (let index = 0; index < keys.length; index++) {
  //       console.log(error.errors[keys[index]].message)
  //     }
  })

console.log(animal)
