const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
var router = express.Router()


    module.exports = router;
    // // ========================
    // // Link to Database
    // // ========================
    // // Updates environment variables
    // // @see https://zellwk.com/blog/environment-variables/
    require('dotenv')
    // Replace process.env.DB_URL with your actual connection string
    const connectionString = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb"
    var client  = MongoClient.connect(connectionString)
    const db = client.db('garage')

    exports.db = db
    
    


