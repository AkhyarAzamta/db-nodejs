// deklarasi apa saja yang dibutuhkan lalu install npm i express mysql
const express = require("express") //untuk mengatur fungsionalitas website, seperti pengelolaan routing dan session, permintaan HTTP, penanganan error, serta pertukaran data di server
const mysql = require("mysql") //untuk koneksi ke mysql
const BodyParser = require("body-parser")

const app = express(); //definisikan si express nya menjadi app karna awalnya sebuah function

app.use(BodyParser.urlencoded({ extended: false})) //untuk menerima form input

app.set("view engine", "ejs") //ejs sebagai template engine
app.set("views", "views") //untuk memberitau direktori html nya ada difolder views

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

        //untuk get data
        app.get('/', (req, res) => {
            const sql = "SELECT * FROM user"
            db.query(sql, (err, result) => {
                const users = JSON.parse(JSON.stringify(result))
                console.log("hasil database -> ", users)
                res.render("index", {users: users, title: "Data Mahasiswa Kelas B"})
            }) 
        })

        app.get('/cari', (req, res) => {
            res.sendFile('./views/cari.html', {root: __dirname});
            console.log("connection...")
        })

        app.post('/tambah', (req, res) => {
            const insertSql = `INSERT INTO user (nama, nim) VALUES ('${req.body.nama}
            ', '${req.body.nim}')`;
            
            console.log("hai gaes.")
            db.query(insertSql, (err, result) => {
                if (err) throw err
                res.redirect("/")
            })
    })
})


app.listen(8000, () => {
    console.log("server ready...")
})
''