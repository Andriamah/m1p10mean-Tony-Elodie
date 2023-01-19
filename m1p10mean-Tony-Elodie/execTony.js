const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient




const connectionString = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb"
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))
MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('garage')
  var atelier_server = require('./atelier_server')
  atelier_server.start(app,db);
})
.catch(console.error)

const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? 7500 : 3000
app.listen(port, function () {
    console.log(`listening on ${port}`)    
})