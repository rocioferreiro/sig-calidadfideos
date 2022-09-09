require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const port = 3001
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  bodyParser.urlencoded({
    extended: true,
  })
  next();
})

app.get('/', (request, response) => {
  response.json({info: 'Node.js, Express, and Postgres API'})
})

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.get('/user/:email', db.getUserByEmail)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.put('/users/:id/coin', db.addCoin)
// app.put('/drops/:id/buy', db.buyCollectible)
// app.delete('/users/:id', db.deleteUser)
// app.get('/drops', db.getDrops)
// app.get('/drops/:id', db.getDropById)
// app.get('/drops/:id/count', db.getDropCount)
// app.get('/upcoming-drop', db.getUpcomingDrop)
// app.get('/users/:id/mints', db.getUserMints)
// app.get('/users/:id/purchases', db.getPurchases)
// app.get('/drops/search/:query', db.searchDrops)
// app.post('/listings', db.createListing)
// app.get('/listings', db.getListings)
// app.put('/listings/:id', db.updateListing)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
  console.log(process.env.PGUSER);
})
