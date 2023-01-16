const express = require('express')
const app = express()

var utilisateur_server = require('./utilisateur_server')
var reparation_server = require('./reparation_server')
var voiture_server = require('./voiture_server')
utilisateur_server.start(app);
reparation_server.start(app);
voiture_server.start(app);

const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? 7500 : 3000
app.listen(port, function () {
    console.log(`listening on ${port}`)
})