const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://127.0.0.1:27017/players_and_teams', {useNewUrlParser: true})
mongoose.connection.on('connected', () => console.log(`Server is now connected to mongoDB...`))

// setup your schemas here:
const playerSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    required: true
  },
  last_name: {
    type: String,
    trim: true,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
})

const teamSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 45,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
    required: true
  },
  roster: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }]
}, { autoIndex: false })

// assign and extract the models from schemas
const Player = mongoose.model('Player', playerSchema)
const Team = mongoose.model('Team', teamSchema)

app.set('view engine', 'ejs')

app.set(path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({extended: true}))

app.set('host', '0.0.0.0')
app.set('port', process.env.PORT || 8000)

// Index root
app.get('/', function (request, response) {
  console.log(`Client requested: ${request.url}`)
  response.render('index')
})

// /////////////////////////////// Routing rules for players ///////////////////////////
app.get('/players', function (request, response) {
  Player.find({})
    .populate(team)
    .then(players => {
      console.log('PLAYERS', players)
      response.render('players/index', {players})
    })
    .catch(error => console.log(error))
})

app.get('/players/new', function (request, response) {
  response.render('players/new')
})

app.post('/players', function (request, response) {
  Player.create(request.body)
    .then(player => {
      console.log(`Added Player: ${player}`)
      response.redirect('/players') // redirects are always get requests.
    })
    .catch(error => console.log(error))
})

// /////////////////////////////// Routing rules for teams ///////////////////////////
app.get('/teams', function (request, response) {
  console.log(`Client requested: ${request.url}`)
  // get teams
  Team.find({})
    .populate(roster)
    .then(teams => {
      response.render('teams/index', {teams})
    })
    .catch(error => console.log(error))
})

app.get('/teams/new', function (request, response) {
  console.log(`Client requested: ${request.url}`)
  response.render('teams/new')
})

app.post('/teams', function (request, response) {
  Team.create(request.body)
    .then(team => {
      // find the players for this team
      return Player.find(team.roster) // returns an array of players' ids.
        .then(players => {
          players.forEach(player => team.roster.push(player))
        })
        .then(() => {
          console.log(`Newly created team: ${team}`)
          response.redirect('/teams')
        })
    })
    .catch(error => console.log(error))
})

const server = app.listen(app.get('port'), () => console.log(`Server is running on port ${server.address().port}`))
