const express = require('express')
const bodyParser = require('body-parser')
var router = express.Router()

require('dotenv')

function start(app = express(), db) {

    const voitureCollection = db.collection('voiture')
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))
    // Router
    app.get('/connexion', (req, res) => {
        return res.json({ "voiture": "coucou" })
    })

    app.get('/voitures-encours-client/nom=:nom', (req, res) => {
        // voitureCollection.findOne({ "statut": "0" ,"utilisateur.nom" : req.params.nom})
        console.log("Vo hditra")

        voitureCollection.find({ "statut": "0", "utilisateur.nom": req.params.nom }).toArray()
            .then(voiture => {
                if (voiture != null) {
                    console.log("voiture")

                    return res.json(voiture)
                } else {
                    console.log("Null")
                }

            })
            .catch(/* ... */)
    })
}
exports.start = start;

