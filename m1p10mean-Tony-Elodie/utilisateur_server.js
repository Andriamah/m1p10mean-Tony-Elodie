const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var router = express.Router()
const { encrypt, decrypt } = require('./crypto')


require('dotenv')

function start(app = express(), db) {
  const utilisateurCollection = db.collection('utilisateur')
  
  // ========================
  // Routes
  // ========================

  app.get('/', (req, res) => {
    console.log('ato za')

  })

  // Login--------------------------------------------
  app.post('/login', (req, res) => {
    utilisateurCollection.findOne(
      {
        mail: req.body.mail,
        mot_de_passe: req.body.mot_de_passe
      }
    )
      .then(
        result => {
          if (result != null) {
            // if (result.role == "client") {
            //   console.log("Vlient")

            //   return res.json('CLIENT')

            // } if (result.role == "atelier") {
            //   console.log("anao atelier")

            //   return res.json('ATELIER ')

            // } else {
            //   console.log("anao finance")

            //   return res.json('FINANCIERE ')
            // }
            return res.json(result)
          } else {
            return res.json('DISO')
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


}
exports.start = start;

