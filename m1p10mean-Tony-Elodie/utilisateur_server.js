const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var router = express.Router()
const  ObjectID = require('mongodb').ObjectId;


require('dotenv')

function start(app = express(), db) {
  const utilisateurCollection = db.collection('utilisateur')
  
  // ========================
  // Routes
  // ========================

  app.get('/utilisateur/_id=:_id', (req, res) => {
    console.log(req.params._id)
    // collection.findOne({ _id: ObjectId("5d71522dc452f78e335d2d8b") });
    utilisateurCollection.findOne(
      {
        _id : ObjectID(req.params._id)
      }
    )
      .then(
        result => {
          if (result != null) {
            return res.json(result)
          } else {
            return res.json('DISO')
          }
        })
      .catch(error => console.error(error))

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

