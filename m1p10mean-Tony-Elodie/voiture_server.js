const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
var router = express.Router()

// ========================
// Link to Database
// ========================
// Updates environment variables
// @see https://zellwk.com/blog/environment-variables/


// Replace process.env.DB_URL with your actual connection string
require('dotenv')


function start(app = express(),db) {

      const voitureCollection = db.collection('utilisateur')

      // ========================
      // Middlewares
      // ========================
      // app.set('view engine', 'ejs')
      // app.use(bodyParser.urlencoded({ extended: true }))
      // app.use(bodyParser.json())
      // app.use(express.static('public'))

      // ========================
      // Routes
      // ========================
      app.get('/elo', (req, res) => {
        return res.json('fffggf :  ')

      })
      // Save voiture--------------------------------------------
      app.post('/depotvoiture', (req, res) => {
        voitureCollection.insertOne(req.body)
          .then(result => {
            // res.redirect('/')
            return res.json(result)
          })
          .catch(error => console.error(error))
      })
      // Save voiture--------------------------------------------


      // voiture du client en reparation--------------------------------------------
      app.get('/voitures-encours-client/nom=:nom', (req, res) => {
        // voitureCollection.findOne({ "statut": "0" ,"utilisateur.nom" : req.params.nom})
        voitureCollection.find({ "statut": "0", "utilisateur.nom": req.params.nom }).toArray()
          .then(voiture => {
            if (voiture != null) {
              return res.json(voiture)
            } else {
              console.log("Null")
            }

          })
          .catch(/* ... */)
      })
      // voiture du client en reparation--------------------------------------------


      // Recuperer Voiture --------------------------------------------
      app.put('/recuperer-voiture/_id=:_id', (req, res) => {
        voitureCollection.findOneAndUpdate({ "utilisateur.nom": "Nancy" }, { $set: { "statut": 1 } })
          .then(result => {
            if (result != null) {
              return res.json(result)
            } else {
              console.log("Null")
            }

          })
          .catch(error => console.error(error))
      })

  
  // Recuperer Voiture --------------------------------------------


}
exports.start = start;

