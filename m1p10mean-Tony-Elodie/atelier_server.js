const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv')

function start(app = express(), db) {
  // module.exports = router;
  const voiturecollection = db.collection('voiture')
  const reparationcollection = db.collection('reparation')
  const detail = db.collection('detail')
  // ========================
  // Middlewares
  // ========================

  app.get('/reception_voiture', (req, res) => {
    voiturecollection.find({ statut: "0",}).toArray()
      .then(quotes => {
        res.json(quotes);
      })
      .catch(/* ... */)
  })

  app.get('/getOnevoiture/matricule=:matricule', (req, res) => {
    voiturecollection.find({ "statut": "0","matricule":req.params.matricule}).toArray()
      .then(quotes => {
        res.json(quotes);
      })
      .catch(/* ... */)
  })

  app.get('/reparation_voiture/matricule=:matricule', (req, res) => {
    reparationcollection.find({"voiture.matricule": req.params.matricule,"etat":"0"}).toArray()
      .then(quotes => {
        res.json(quotes[0].detail);
        console.log(quotes[0].detail)
      })
      .catch(/* ... */)
  })

  app.post('/ajouter_reparation', (req, res) => {
    console.log("hahahaha")
    var detail = req.body.detail
    console.log(req.body.detail)
    // console.log(detail.length)
    var total = 0;
    for (let i = 0; i < detail.length; i++) {
      console.log(detail[i].prix)
      total = total + detail[i].prix
    }
    req.body.total = total
    res.json(req.body)
    reparationcollection.insertOne(req.body);
    voiturecollection.findOneAndUpdate(
      {"matricule":req.body.voiture.matricule},
      {
        $set: {
          "statut": 
          "1"
        },
      }
    )
      .then(result => res.json('Success'))
      // console.log("poinsa")
      .catch(error => console.error(error))
  })

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

  app.put('/finir_detail_reparation', (req, res) => {
    console.log("matricule")
    console.log(req.body.matricule)
    console.log("detail")
    console.log(req.body.detail)
    reparationcollection.findOneAndUpdate(
      {"voiture.matricule":req.body.matricule,"etat":"0"},
      {
        $set: {
          "detail": 
           req.body.detail,
           "avancement":req.body.avancement
        },
      
      }
    )
      .then(result => res.json('Success'))
      // console.log("poinsa")
      .catch(error => console.error(error))
  })

}
exports.start = start;