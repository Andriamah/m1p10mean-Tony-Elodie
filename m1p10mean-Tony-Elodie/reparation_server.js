const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const nodemailer = require("nodemailer")

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
        const valiny = reparationCollection.aggregate([
            {
                $lookup:
                {
                    _id: { month: { $month: "$date_debut" }, year: { $year: "$date_debut" } },
                    totalAmount: { $sum: "$total" },
                    count: { $sum: 1 }
                }
            }
        ]).then(reparataion => {
            return res.json(reparataion)
        })
            .catch(console.log("elo"))
        return res.json(valiny)

    })



    // --------------------------
    app.get('/benefice', (req, res) => {
        var data = [{
            id: 1, elo: 2
        }, {
            id: 21, elo: 2
        }];

        console.log("isany " + data.length);
        var total = 0
        for (const val of data) {
            total = total + val.id
        }
        console.log("Valiny teooo " + total)
        return res.json(data.length)
        req.body.total = total

    })

    app.get('/send_mail', async (req, res) => {
        let transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            service :'gmail',
            auth: {
                user: 'wendydarling1215@gmail.com', // generated ethereal user
                pass: 'onbyvskabveufadg', // generated ethereal password
            },
        });
        // send mail with defined transport object
        const msg ={
            from: 'wendydarling1215@gmail.com', // sender address
            to: 'andriamahanintsoelo@gmail.com', // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world? Mail via node", // plain text body
        };
        const info = await transporter.sendMail(msg ,function(error,ifon){
            if(error)
            {
                console.log("TSY METY")
                console.log(error)
            }else{
                console.log("METY")
                console.log(" email send "+info.response)
            }
        });

    })


    // --------------------------


    // ========================
    // Listen
    // ========================


}
exports.start = start;

