const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

// ========================
// Link to Database
// ========================
// Updates environment variables
// @see https://zellwk.com/blog/environment-variables/
require('dotenv')

// Replace process.env.DB_URL with your actual connection string

function start(app = express()) {

    const connectionString = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb"

    MongoClient.connect(connectionString, { useUnifiedTopology: true })
        .then(client => {
            console.log('Connected to Database')
            const db = client.db('garage')
            const reparationCollection = db.collection('reparation')

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

            // Fiche reparation en cours---------------------Mieritreritra aho oe mety ts ialiana-----------------------
            app.get('/reparation-afaire/nom=:nom', (req, res) => {
                reparationCollection.find({ "etat": "0" ,"voiture.nom" : req.params.nom}).toArray()
                    .then(reparataion => {
                        console.log("boby")
                        return res.json(reparataion)
                    })
                    .catch(/* ... */)
            })
            //  List reparation en cours--------------------------------------------


            // Fiche reparation selectionne--------------------------------------------
            app.get('/fiche-reparations/_id=:_id', (req, res) => {
                reparationCollection.find({ "_id": req.params._id }).toArray()
                    .then(reparataion => {
                        return res.json(reparataion)
                    })
                    .catch(/* ... */)
            })
            //  Fiche reparation selectionne--------------------------------------------

            // Valider Paiement--------------------------------------------
            app.put('/reparationsnnn', (req, res) => {
                reparationCollection.update({ "_id": req.params._id }, { $set: { "statu": 1 ,"date_paiement":"new Date().toISOString().substring(0, 10)"} 
            })
                    .then(reparataion => {
                        return res.json(reparataion)
                    })
                    .catch(/* ... */)
            })
            //  Valider Paiement--------------------------------------------

            // ========================
            // Listen
            // ========================
            
        })
        .catch(console.error)

}
exports.start = start;

