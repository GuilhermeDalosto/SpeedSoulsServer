var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    port: 3306,
    database: "soulsserver"
});

conn.connect(function (err) {
    if (err) throw err;
    console.log('Connected');    
});




// function addRows(conn){
//     const sql = "INSERT INTO usuario(login,senha) values ?";
//     const values = ['gui','123'];

//     conn.query(sql,[values], function (error,results,fields){
//         if (error) return console.log(error)
//         console.log('added data');
//         conn.end();
//     })
// }






