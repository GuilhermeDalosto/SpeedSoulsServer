const express = require('express');
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

// Search specific user
router.get('/usuario/:login?/:password',(req,res) => {
    let filter = '';
    if (req.params.login) filter = "WHERE login =" +  "'" + req.params.login + "'";
    filter += "AND senha =" +  "'" + req.params.password + "'";     
    execSQLQuery('SELECT * FROM usuario ' + filter, res);
})

// Delete specific user
router.delete('/usuario/:login?',(req,res) => {
    let filter = '';
    if (req.params.login) filter = "WHERE login =" +  "'" + req.params.login + "'";    
    execSQLQuery('DELETE FROM usuario ' + filter, res);
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

