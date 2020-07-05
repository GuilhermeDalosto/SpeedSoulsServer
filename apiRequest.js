// Attributes for imports and constants
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5000;
const mysql = require('mysql');

// Encode with the express and json format using body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Router to def the connection with request of HTTP via client-side
const router = express.Router();
router.get('/',(req, res) => res.json({message: 'Working'}));
app.use('/',router);

// Time def for app to connect with Cloud Service
app.listen(process.env.PORT || 5000)
console.log('API Working');

// Search all users
router.get('/usuario',(req,res) => {
    execSQLQuery('SELECT * FROM usuario',res);
})

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

// Register specific user
router.post('/usuario',(req,res) => {
    const name = req.body.name.substring(0,10);
    const password = req.body.password.substring(0,12);    
    execSQLQuery(`INSERT INTO usuario(name,password) values('${name}' ,'${password}')`, res);
})

// Send email to support by getting logged user with his email and password
router.post('/email/:mailer?/:message?',(req,res) => {
    const name = req.body.mailer;
    const message = req.body.message.substring(0,40);    
    transporter.sendMail(mailOptions, function(error, info);    
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

// Create transport to auth the user accordingly to his data on client-side
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mailer,
    pass: mailerPassword
  }
});

// Mail options and format to send to defined email categorized as support
var mailOptions = {
  from: mailer,
  to: 'dalostoguilherme@gmail.com',
  subject: 'Support Email Souls Run',
  html: 'Souls Runner Support Message',
  text: message
};

// Send email and get request and response
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

