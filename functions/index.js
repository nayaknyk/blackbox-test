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
        // getting parameters from query string
        const fname = req.query.ufname;
        const lname = req.query.ulname;
        const dest = req.query.uemail;
        const reg = req.query.uvid;
        const speed = req.query.speed;
        const location = req.query.location;
        
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        //email
        const mailOptions = {
            from: 'RTO Goa Test Mail<rtogoaexample@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'Speed Violation', // email subject
            html: `<b>Challan for Speed Limit Violation</b>
                <p>Challan ID: 001</p>
                <p>Vehicle Reg.: `+reg+`</p>
                <p>Registered under: `+fname+` `+lname+`</p>
                <p>Recorded Speed: `+speed+`</p>
                <p>Location: `+location+`</p>
                <p>Date & Time of offence: `+dateTime+`</p>
                <p>The vehicle registered under your name was detected exceeding the speed limit. Please pay the fine of Rs. 100/- at your local police station/RTO office.
                <br>
                Regards,<br>RTO Goa
                </p><br><br><br>
                <p>This is a computer generated mail for test purposes only and is not an official document</p>
            ` // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Email sent for speeding');
        });
    });    
});