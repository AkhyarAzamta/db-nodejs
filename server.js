// deklarasi apa saja yang dibutuhkan lalu install npm i express mysql
const express = require("express") //untuk mengatur fungsionalitas website, seperti pengelolaan routing dan session, permintaan HTTP, penanganan error, serta pertukaran data di server
const mysql = require("mysql") //untuk koneksi ke mysql

const app = express(); //definisikan si express nya menjadi app karna awalnya sebuah function

//configurasi awal atau inisialisasi
const db = mysql.createConnection({
    host: "localhost",
    database: "db_mahasiswa",
    user: "root", 
    password: "",
})

//koneksi ke databases
db.connect((err) => {
    if (err) throw err
    console.log("connection success...")

    const sql = "SELECT * FROM user"
    db.query(sql, (err, result) => {
        const users = JSON.parse(JSON.stringify(result))
        console.log("hasil database -> ", users)
        app.get("/", (req, res) => {
            res.send(users)
        })
    })

    
})


app.listen(8000, () => {
    console.log("server ready...")
})
