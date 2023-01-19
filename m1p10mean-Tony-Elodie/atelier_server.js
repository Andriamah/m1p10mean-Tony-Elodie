const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv')

function start(app = express(), db) {
  // module.exports = router;
  const voiturecollection = db.collection('voiture')
  const reparationcollection = db.collection('reparation')
  // ========================
  // Middlewares
  // ========================

  app.get('/reception_voiture', (req, res) => {
    voiturecollection.find({ statut: "0" }).toArray()
      .then(quotes => {
        res.json(quotes);
      })
      .catch(/* ... */)
  })

  app.post('/ajouter_reparation', (req, res) => {
    console.log("hahahaha")
    var detail = req.body.detail
    console.log(req.body.detail)
    console.log(detail.length)
    var total = 0;
    for (let i = 0; i < detail.length; i++) {
      console.log(detail[i].prix)
      total = total + detail[i].prix
    }
    req.body.total = total
    res.json(req.body)
    reparationcollection.insertOne(req.body);
  })

  app.post('/finir_detail_reparation', (req, res) => {
     
    reparationcollection.findOneAndUpdate(
      { "detail.object" :req.body.object,"voiture.matricule":req.body.matricule,"etat":"0","detail.prix" :req.body.prix},
      {
        $set: {
          "detail": [
            {
                "prix": req.body.prix,
                "object": req.body.object,
                "etat": "1"
            }
        ],
        },
      
      }
    )
      .then(result => res.json('Success'))
      .catch(error => console.error(error))
  })

  




}
exports.start = start;