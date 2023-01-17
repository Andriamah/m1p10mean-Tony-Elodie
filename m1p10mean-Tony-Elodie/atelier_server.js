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
    var total = 0;
    for (let index = 0; index < detail; index++) {
      console.log(detail[index].prix)
    }

    // reparationcollection.insertOne(req.body);

  })
}

exports.start = start;