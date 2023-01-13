const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

// ========================
// Link to Database
// ========================
// Updates environment variables
// @see https://zellwk.com/blog/environment-variables/
require('./dotenv')

// Replace process.env.DB_URL with your actual connection string

function start() {

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

            // Create reparation--------------------------------------------
            app.post('/reparation', (req, res) => {
                reparationCollection.insertOne(req.body)
                    .then(result => {
                        // res.redirect('/')
                        console.error(result)
                    })
                    .catch(error => console.error(error))
            })
            //  Create reparation--------------------------------------------

            // List reparation en cours--------------------------------------------
            app.get('/reparations', (req, res) => {
                reparationCollection.find({ "etat": "0" }, { "_id": req.params._id }).toArray()
                    .then(reparataion => {
                        return res.json(reparataion)
                    })
                    .catch(/* ... */)
            })
            //  List reparation en cours--------------------------------------------

            // ========================
            // Listen
            // ========================
            const isProduction = process.env.NODE_ENV === 'production'
            const port = isProduction ? 7500 : 3000
            app.listen(port, function () {
                console.log(`listening on ${port}`)
            })
        })
        .catch(console.error)

}
