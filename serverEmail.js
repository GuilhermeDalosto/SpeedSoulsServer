// Framework to send email
var nodemailer = require('nodemailer');
// User Email to send via Support
var mailer = "";
var mailerPassword = "";
// User message to send via Support
var message = "";

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mailer,
    pass: mailerPassword
  }
});

var mailOptions = {
  from: mailer,
  to: 'dalostoguilherme@gmail.com',
  subject: 'Support Email Souls Run',
  html: 'Souls Runner Support Message',
  text: message
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});