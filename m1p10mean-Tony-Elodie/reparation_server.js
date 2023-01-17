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

function start(app = express(), db) {


    const reparationCollection = db.collection('reparation')

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

    // Fiche reparation en cours---------------------Mieritreritra aho oe mety ts ialiana-----------------------
    app.get('/reparation-afaire/nom=:nom', (req, res) => {
        reparationCollection.find({ "etat": "0", "voiture.nom": req.params.nom }).toArray()
            .then(reparataion => {
                console.log("boby " + req.params.nom)
                return res.json(reparataion)
            })
            .catch(/* ... */)
    })
    //  List reparation en cours--------------------------------------------

    // Historique reparation du client--------------------------------------------
    app.get('/historique-reparation/nom=:nom', (req, res) => {
        reparationCollection.find({ "voiture.nom": req.params.nom }).toArray()
            .then(reparataion => {
                console.log("boby")
                return res.json(reparataion)
            })
            .catch(/* ... */)
    })
    // Historique reparation du client--------------------------------------------


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
    app.put('/valider-paiement/_id=:_id', (req, res) => {
        //     reparationCollection.updateOne({ "_id": req.params._id }, { $set: { "etat": 111 } },{upsert: true}
        // })
        reparationCollection.findOneAndUpdate({ "voiture.nom": req.params._id },
            { $set: { "etat": 1, "date_paiement": new Date() } }, { upsert: true })
            .then(reparataion => {
                console.log("valisation " + req.params._id)
                return res.json(reparataion)
            })
            .catch(/* ... */)
        db.close()
    })
    //  Valider Paiement--------------------------------------------

    // Chiffre d'afaire jour--------------------------------------------
    app.get('/chiifre_affaire', (req, res) => {
        reparationCollection.aggregate([
            { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
        ])
            // reparationCollection.findOne({ "$date_debut": "2023-01-16T20:29:11.005Z" })
            .then(reparataion => {
                return res.json(reparataion)
            })
            .catch(console.log("elo"))
        db.close()

    })
    //  Chiffre d'afaire jour--------------------------------------------

    // // Chiffre d'afaire Mois--------------------------------------------
    app.get('/chiifre_affaire', (req, res) => {
        reparationCollection.aggregate(
            [
                {
                    $group:
                    {
                        _id: { month: { $month: "$date_debut" }, year: { $year: "$date_debut" } },
                        totalAmount: { $sum: "$total" },
                        count: { $sum: 1 }
                    }
                }
            ]
        )
            .then(reparataion => {
                return res.json(reparataion)
            })
            .catch(console.log("elo"))
        db.close()

    })
    //  Chiffre d'afaire Mois--------------------------------------------

    app.get('/chiffre_affaire', (req, res) => {
        // reparationCollection.aggregate([
        //     { $match: { etat: 0 } }
        // ]).then(function (docs) {
        //     console.log(docs)
        // })
        //     .catch(console.log("elo"))



        const pipeline = [
                { $match: { etat: 0 } }
            ];
        const aggCursor = coll.aggregate(pipeline);
        for await (const doc of aggCursor) {
            console.log(doc);
        }

    })



    // --------------------------
    app.get('/benefice', (req, res) => {
        reparationCollection.find({ "_id": req.params._id }).toArray()
            .then(reparataion => {
                return res.json(reparataion)
            })
            .catch(/* ... */)
    })


    // --------------------------


    // ========================
    // Listen
    // ========================


}
exports.start = start;

