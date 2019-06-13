var functions = require('firebase-functions');
var admin = require('firebase-admin');
var nodemailer = require('nodemailer');
var cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rtogoaexample@gmail.com',
        pass: 'rtogoaexample123'
    }
});

exports.sendChallan = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        // getting dest email by query string
        const dest = req.query.dest;

        const mailOptions = {
            from: 'RTO Goa Test Mail<rtogoaexample@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Speed Violation', // email subject
            html: `<p style="font-size: 16px;">Challan for Speed Limit Violation</p>
                <br><br>
                <p>Challan ID: 1002</p>
                <p>The vehicle (GA-06-A2313) registered under your name was detected exceeding the speed limit. Please pay the fine of Rs. 100/- at your local police station/RTO office.
                <br>
                Regards,<br>RTO Goa
                </p><br><br>
                <p>This is a computer generated mail</p>
            ` // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Email sent');
        });
    });    
});