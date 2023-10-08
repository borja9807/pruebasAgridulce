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
    database        : 'inventario'
})

// get all products
app.get('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * FROM inventariosDeProductos'
        , (err, rows) =>{
            connection.release() //return the connection to pool

            if(!err){
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })

    
})

// obtener producto con id
app.get('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * FROM inventariosDeProductos WHERE id = ?', [req.params.id], (err, rows) =>{
            connection.release() //return the connection to pool

            if(!err){
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })

    
})

// eliminar producto con id
app.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE * FROM inventariosDeProductos WHERE id = ?', [req.params.id], (err, rows) =>{
            connection.release() //return the connection to pool

            if(!err){
                res.send(`El producto con ID: ${(req.params.id)} ha sido eliminado.`)
            } else {
                console.log(err)
            }
        })
    })

    
})












// Listen on enviroment port or 5000
app.listen(port, () => console.log(`listen on port ${port}`))