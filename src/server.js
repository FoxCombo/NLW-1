const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

//configurar pasta pública
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da aplicação
//página inicial
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    // req.query: query strings da URL
    //console.log(req.query);

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    
    // inserir dados no banco de dados
        const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?, ?, ?, ?, ?, ?, ?);
        `
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]
        
        const altImgLink = "https://images.unsplash.com/photo-1558583082-409143c794ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        
        const altValues = [
            altImgLink,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]

        function afterInsertData(err) {
            if(err) {
                console.log(err);
                return res.render("create-point.html", {error: true})
            }
    
            console.log("Cadastrado com sucesso!");
            console.log(this);

            return res.render("create-point.html", {saved: true})
        }

        if(values[0] == "") {
            db.run(query, altValues, afterInsertData)
        } else {
            db.run(query, values, afterInsertData)
        }
})

server.get("/search", (req, res) => {

    const search = req.query.searchByCity
    const search2 = req.query.searchByState

    if(search === "" && search2 === "") {
        db.all(`SELECT * FROM places ORDER BY name`, function(err, rows) {
            if(err) {
                return console.log(err);
            }
    
            const total = rows.length
    
            // mostrar a página HTML com os dados do banco de dados
            return res.render("search-results.html", { places: rows, total })
        })
    } else if(search != "" && search2 === "") {
        // pegar os dados do banco de dados
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' ORDER BY name`, function(err, rows) {
            if(err) {
                return console.log(err);
            }

            const total = rows.length

            // mostrar a página HTML com os dados do banco de dados
            return res.render("search-results.html", { places: rows, total })
        })
    } else if(search === "" && search2 != "") {
        // pegar os dados do banco de dados
        db.all(`SELECT * FROM places WHERE state LIKE '%${search2}%' ORDER BY name`, function(err, rows) {
            if(err) {
                return console.log(err);
            }

            const total = rows.length

            // mostrar a página HTML com os dados do banco de dados
            return res.render("search-results.html", { places: rows, total })
        })
    } else {
        // pegar os dados do banco de dados
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' AND state LIKE '%${search2}%' ORDER BY name`, function(err, rows) {
            if(err) {
                return console.log(err);
            }

            const total = rows.length

            // mostrar a página HTML com os dados do banco de dados
            return res.render("search-results.html", { places: rows, total })
        })
    }
    
})



// ligar o servidor
server.listen(3000)