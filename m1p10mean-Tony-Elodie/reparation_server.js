const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const nodemailer = require("nodemailer")

const mail = require("./sendMail")
const ObjectID = require('mongodb').ObjectId;


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
    // Routes
    // ========================


    app.get('/reparation-fini', (req, res) => {
        reparationCollection.find({  etat: {
            $lt: "3"
        } }).toArray()
            .then(reparataion => {
                return res.json(reparataion)
            })
            .catch(/* ... */)
    })

    // ----------------------------


    // Fiche reparation en cours---------------------Mieritreritra aho oe mety ts ialiana-----------------------
    app.get('/reparation-afaire/mail=:mail', (req, res) => {
        reparationCollection.find({ "etat": "0", "voiture.utilisateur.mail": req.params.mail }).toArray()
            .then(reparataion => {
                return res.json(reparataion)
            })
            .catch(/* ... */)
    })
    app.get('/reparationGlobal', (req, res) => {
        reparationCollection.find().toArray()
            .then(reparataion => {
                return res.json(reparataion)
            })
            .catch(/* ... */)
    })
    //  List reparation en cours--------------------------------------------

    // Historique reparation du client--------------------------------------------
    app.get('/historique-reparation-filtre/nom=:nom&debut=:debut&fin=:fin', (req, res) => {
        reparationCollection.find({
            "voiture.utilisateur.mail": req.params.nom,
            "date_debut": {
                $gte: new Date(req.params.debut),
                $lt: new Date(req.params.fin)
            }
        }).toArray()
            .then(reparataion => {
                console.log("boby")
                return res.json(reparataion)
            })
            .catch(/* ... */)
    })


    app.get('/reparation-historique/mail=:mail', (req, res) => {
        reparationCollection.find({ "voiture.utilisateur.mail": req.params.mail }).toArray()
            .then(reparataion => {
                return res.json(reparataion)
            })
            .catch(/* ... */)
    })
    // Historique reparation du client--------------------------------------------


    // Fiche reparation selectionne--------------------------------------------
    app.get('/fiche-reparations/_id=:_id', (req, res) => {
        reparationCollection.findOne({ "_id": ObjectID(req.params._id) })
            .then(reparataion => {
                return res.json(reparataion)
            })
            .catch(/* ... */)
    })

    app.get('/fiche-reparations-detail/_id=:_id', (req, res) => {
        reparationCollection.findOne({ "_id": ObjectID(req.params._id) })
            .then(reparataion => {
                return res.json(reparataion.detail)
            })
            .catch(/* ... */)
    })
    //  Fiche reparation selectionne--------------------------------------------


    // Valider Paiement--------------------------------------------
    app.put('/valider-paiement/_id=:_id', (req, res) => {
        reparationCollection.findOneAndUpdate({ "_id": ObjectID(req.params._id) },
            { $set: { "etat": "2", "date_paiement": new Date() } }, { upsert: true })
            .then(reparataion => {
                mail.sendMail(reparataion.value.voiture.utilisateur.mail, reparataion.value.voiture.matricule)
                console.log("valisation " + reparataion.value.voiture.utilisateur.mail)
                console.log("valisation " + reparataion.value.voiture.matricule)

                return res.json(reparataion)
            })
            .catch(/* ... */)
        // db.close()
    })
    //  Valider Paiement--------------------------------------------


    // Recuperer Voiture --------------------------------------------
    app.put('/sortire-voiture/_id=:_id', (req, res) => {
        reparationCollection.findOneAndUpdate({ "_id": ObjectID(req.params._id) }, { $set: { "etat": "3" } })
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


    // Moyenne--------------------------------------------
    app.get('/temp-moyenne', (req, res) => {
        reparationCollection.aggregate([
            {
                $project: {
                    difference: {
                        $divide: [
                            { $subtract: [new Date(), "$date_debut"] },
                            60000
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    moyenne: { $avg: "$difference" }
                }
            }
        ]).toArray()
            .then(reparataion => {
                return res.json(reparataion)
            })
            .catch(error => console.error(error))
    })


    app.get('/temp-moyenne2', (req, res) => {
        reparationCollection.find({
            etat: {
                $gte: "2"
            }
        }).toArray()
            .then(reparations => {
                var retour = []
                var size = reparations.length
                for (let step = 0; step < size; step++) {

                    console.log("chr : " + reparations[step].date_debut + " and   " + reparations[step].date_fin)
                    var la_duree = mail.calcule_difference_date(reparations[step].date_debut, reparations[step].date_fin)
                    var la_moyenne = (la_duree) / reparations[step].detail.length
                    let moyenne = {
                        id: reparations[step]._id,
                        matricule : reparations[step].voiture.matricule,
                        date_debut: reparations[step].date_debut,
                        duree: la_duree,
                        moyenne: la_moyenne,
                        nbDdetail: reparations[step].detail.length
                    }

                    retour.push(moyenne)
                }
                return res.json(retour)
            })
            .catch(error => console.error(error))
    })
    //  Moyenne--------------------------------------------

    // Chiffre d'afaire jour--------------------------------------------
    app.get('/chiffre_affaire/jour=:jour', (req, res) => {
        var j1 = req.params.jour + "T01:00:00"
        var j2 = req.params.jour + "T23:59:59"
        reparationCollection.aggregate([
            {
                $match: {
                    "date_debut": {
                        $gte: new Date(j1),
                        $lte: new Date(j2)
                    }
                }
            },
            { $group: { _id: "$date_debut", valeur: { $sum: "$total" } } }
        ]).toArray()
            .then(reparations => {
                var variable = 0
                reparations.forEach(reparation =>
                    variable = variable + reparation.valeur
                );
                var retour = {
                    value: variable
                }

                return res.json(retour)
            })
            .catch(error => console.error(error))
    })
    //  Chiffre d'afaire jour--------------------------------------------

    // // Chiffre d'afaire Mois--------------------------------------------
    app.get('/chiffre_affaire/mois=:mois/annee=:annee', (req, res) => {
        reparationCollection.aggregate([
            { $project: { month: { $month: '$date_debut' }, year: { $year: "$date_debut" }, valeur: { $sum: "$total" } } },
            { $match: { month: Number(req.params.mois), year: Number(req.params.annee) } }
        ]).toArray()
            .then(reparataion => {
                console.log(req.params.mois + " " + req.params.annee)
                console.log(reparataion.length)

                var valeur = 0
                reparataion.forEach(element => 
                    valeur = valeur + element.valeur
                    );
                var retour = {
                    value: valeur
                }
                console.log(valeur)
                return res.json(retour)
            })
            .catch(error => console.error(" Ch mois"))

    })
    //  Chiffre d'afaire Mois--------------------------------------------

    // // Benefice--------------------------------------------
    app.get('/benefice-mois/mois=:mois/annee=:annee/depense=:depense', (req, res) => {
        reparationCollection.aggregate([
            { $project: { month: { $month: '$date_debut' }, year: { $year: "$date_debut" }, valeur: { $sum: "$total" } } },
            { $match: { month: Number(req.params.mois), year: Number(req.params.annee) } }
        ]).toArray()
            .then(reparataion => {
                console.log(req.params.mois + " " + req.params.annee)
                var valeur = 0
                reparataion.forEach(element => valeur = valeur + element.valeur);
                var benefice = valeur - Number(req.params.depense)
                var retour = {
                    value: benefice
                }
                console.log("Benefice " + benefice)
                return res.json(retour)
            })
            .catch(error => console.log("manao catch"))

    })
    //  Benefice--------------------------------------------

}
exports.start = start;

