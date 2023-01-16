const express = require('express')
const app = express()

var atelier_server = require('./atelier_server')
atelier_server.start(app);


const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? 7500 : 3000
app.listen(port, function () {
    console.log(`listening on ${port}`)
})