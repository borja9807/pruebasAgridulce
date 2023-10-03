const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

//MySQL
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'pruebasproductos'
})

// get all products
app.length('', (req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from nombre', (err, rows) =>{
            connection.release()//return the connection to pool

            if(!err){
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })

    
})













// Listen on enviroment port or 5000
app.listen(port, () => console.log(`listen on port ${port}`))