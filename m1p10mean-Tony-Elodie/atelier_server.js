const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
var router = express.Router()
require('dotenv')

function start(app = express()) {
  // module.exports = router;


const connectionString = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('garage')
      const utilisateurCollection = db.collection('voiture')

    // ========================
    // Middlewares
    // ========================

  //  app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    // ========================
    // Routes
    // ========================

   
  })
  .catch(console.error)
  
}

exports.start = start;