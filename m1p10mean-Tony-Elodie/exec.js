const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const cors = require("cors")


const connectionString = "mongodb+srv://user_eld:wenna1234@cluster0.l6zyfiz.mongodb.net/?retryWrites=true&w=majority"
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(cors())
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database Lolo')
        const db = client.db('garage')

        var voiture_server = require('./essai')
        voiture_server.start(app,db);

        var utilisateur_server = require('./utilisateur_server')
        var reparation_server = require('./reparation_server')
        var voiture_server = require('./voiture_server')
        utilisateur_server.start(app,db);
        reparation_server.start(app,db);
        voiture_server.start(app,db);

    })
    .catch(console.error)

const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? 7500 : 3000
app.listen(port, function () {
    console.log(`listening on ${port}`)
})