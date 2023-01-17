const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
var router = express.Router()
const { encrypt, decrypt } = require('./crypto')


require('dotenv')

function start(app = express(), db) {
  const utilisateurCollection = db.collection('utilisateur')

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

  app.get('/', (req, res) => {
    console.log('ato za')

    const hash = encrypt('Hello World!')

    console.log(hash)

    // {
    //     iv: '237f306841bd23a418878792252ff6c8',
    //     content: 'e2da5c6073dd978991d8c7cd'
    // }

    const text = decrypt(hash)

    console.log(text)

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
            if (result.role == "client") {
              return res.json('CLIENT :  ' + '    ' + result.nom)

            } if (result.role == "atelier") {
              return res.json('ATELIER  :  ' + '    ' + result.nom)

            } else {
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


}
exports.start = start;

