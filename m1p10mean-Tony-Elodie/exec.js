const express = require('express')
const app = express()
const isProduction = process.env.NODE_ENV === 'production'
      const port = isProduction ? 7500 : 3000
      app.listen(port, function () {
        console.log(`listening on ${port}`)
      })
var server = require('./atelier_server');

server.start(app);

var haha = require('./utilisateur_server');
haha.start(app);

