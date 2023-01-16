const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
var router = express.Router()

require('dotenv')

function start(app = express()) {
  module.exports = router;

// ========================
// Link to Database
// ========================
// Updates environment variables
// @see https://zellwk.com/blog/environment-variables/

// Replace process.env.DB_URL with your actual connection string

  const connectionString = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb"

  MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
      console.log('Connected to Database')
      const db = client.db('garage')
      const utilisateurCollection = db.collection('utilisateur')

      // ========================
      // Middlewares
      // ========================
      app.set('view engine', 'ejs')
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())
      app.use(express.static('public'))

      // ========================
      // Routes
      // ========================

      app.get('/', (req, res) => {
      console.log('ato za')
        return res.json('CLIENT :  ' )
        
      })

      // Login--------------------------------------------
      app.post('/login', (req, res) => {
        utilisateurCollection.findOne(
          {
            nom: req.body.nom,
            mot_de_passe: req.body.mot_de_passe
          }
        )
          .then(
            result => {
              if (result != null) {
                if(result.role=="client"){
                  return res.json('CLIENT :  ' + '    ' + result.nom)

                }if(result.role=="atelier"){
                  return res.json('ATELIER  :  ' + '    ' + result.nom)

                }else{
                  return res.json('FINANCIERE  :  ' + '    ' + result.nom)
                }
              } else {
                return res.json('DISO' + req.params.nom)
              }
            })
          .catch(error => console.error(error))
      })
      // Login--------------------------------------------

      // S'inscrire--------------------------------------------
      app.post('/inscription', (req, res) => {
        utilisateurCollection.insertOne(req.body)
          .then(result => {
            // res.redirect('/')
            return res.json('Inscription  :  ' + '    ' + result)
          })
          .catch(error => console.error(error))
      })
      // S'inscrire--------------------------------------------
    })
    .catch(console.error)

}
exports.start = start;

