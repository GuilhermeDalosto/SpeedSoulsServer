const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const mysql = require('mysql');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const router = express.Router();
router.get('/',(req, res) => res.json({message: 'Working'}));
app.use('/',router);

app.listen(process.env.PORT || 5000)
console.log('API Working');

// Search all users
router.get('/usuario',(req,res) => {
    execSQLQuery('SELECT * FROM usuario',res);
})

// Send email
router.get('sendEmail/:emailer?',(req,res) => {

transporter.sendMail(mailOptions(req.params.emailer, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

});



// Search specific user
router.get('/usuario/:login?/:password',(req,res) => {
    let filter = '';
    if (req.params.login) filter = "WHERE name =" +  "'" + req.params.login + "'";
    filter += "AND password =" +  "'" + req.params.password + "'";     
    execSQLQuery('SELECT * FROM usuario ' + filter, res);
})

// Delete specific user
router.delete('/usuario/:login?',(req,res) => {
    let filter = '';
    if (req.params.login) filter = "WHERE name =" +  "'" + req.params.login + "'";    
    execSQLQuery('DELETE FROM usuario ' + filter, res);
})


router.post('/usuario',(req,res) => {
    const name = req.body.name.substring(0,10);
    const password = req.body.password.substring(0,12);    
    execSQLQuery(`INSERT INTO usuario(name,password) values('${name}' ,'${password}')`, res);
})

// FUNCTIONS
// SEARCH ALL USERS
function execSQLQuery(sqlQry, res) {
    const conn = mysql.createConnection({
        host: "us-cdbr-east-05.cleardb.net",
        user: "ba7227488ec6ba",
        password: "acddcbb2",
        port: 3306,
        database: "heroku_f4901450c04f807"
    });

    conn.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);

        conn.end();
        console.log('Executed');
    })
}

// NODE MAILER

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gmdalosto@gmail.com',
    pass: 'guigamano123'
  }
});

var mailOptions(email,message) = {
  from: email,
  to: 'dalostoguilherme@gmail.com',
  subject: 'Support Message - Dark Souls Speedrun',
  html: '<h1>Support message</h1><p>Message Received from Dark Souls Speedrunner</p>',
  text: message
};











