const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const nodemailer = require("nodemailer")

async function sendMail  (mail,matricule) {
    console.log('Hello elo')
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wendydarling1215@gmail.com', // generated ethereal user
            pass: 'onbyvskabveufadg', // generated ethereal password
        },
    });
    // send mail with defined transport object
    const msg = {
        from: 'wendydarling1215@gmail.com', // sender address
        to: mail, // list of receivers
        subject: "Paiement", // Subject line
        text: "Votre paiement a abouti avec succes \n"+
        "Matricule "+matricule
    };
    const info = transporter.sendMail(msg, function (error, ifon) {
        console.log("Vo anomboka")
        if (error) {
            console.log("TSY METY")
            console.log(error)
        } else {
            console.log("METY")
            console.log(" email send " + info.response)
        }
    });
}

exports.sendMail = sendMail;

async function addcustomer  (variable) {
    console.log(variable)
  }
exports.addcustomer = addcustomer

/**app.get('/send_mail', (req, res) => {
        console.log("coucou")
        let transporter = nodemailer.createTransport({
            // host: "smtp.ethereal.email",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            service: 'gmail',
            auth: {
                user: 'wendydarling1215@gmail.com', // generated ethereal user
                pass: 'onbyvskabveufadg', // generated ethereal password
            },
        });
        // send mail with defined transport object
        const msg = {
            from: 'wendydarling1215@gmail.com', // sender address
            to: 'andriamahanintsoelo@gmail.com', // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world? Mail via node", // plain text body
        };
        transporter.sendMail(msg, function (error, info) {
            if (error) {
                console.log("TSY METY")
                console.log(error)
            } else {
                console.log("METY")
                console.log(" email send " + info.response)
            }
        });

    })
 */





