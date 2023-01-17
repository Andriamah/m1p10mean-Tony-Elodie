const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient


const connectionString = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb"

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database Lolo')
        const db = client.db('garage')


        // const utilisateurCollection = db.collection('voiture')

        var voiture_server = require('./essai')
        voiture_server.start(app,db);

    })
    .catch(console.error)

    const isProduction = process.env.NODE_ENV === 'production'
    const port = isProduction ? 7500 : 3000
    app.listen(port, function () {
        console.log(`listening on ${port}`)
    })