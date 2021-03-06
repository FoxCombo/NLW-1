// importar a dependência do sqlite 3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// consultar dados da tabela por id
/* const id = 19

function tableConsult() {
    db.all(`SELECT * FROM places WHERE id = ${id}`, function(err, rows) {
        if(err) {
            return console.log(err);
        }

        console.log("Aqui estão seus registros: ");
        console.log(rows);
    })
} */



/* const imgLink = "https://images.unsplash.com/photo-1561158318-83210510d944?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"

function imgUpdate() {
    db.all(`UPDATE places SET image = '${imgLink}' WHERE id = ${id}`, function(err, rows) {
        if(err) {
            return console.log(err);
        }

        console.log(rows);
    })
} */

/* db.serialize(() => {
    db.run(`DELETE FROM places`, function(err){
        if(err) {
            return console.log(err);
        }

        console.log("Dados deletados com sucesso!");
    })
}) */

// utilizar o objeto de banco de dados para operações
/* db.serialize(() => {
    // criar uma tabela com comandos SQL
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    // inserir dados na tabela
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err);
        }

        console.log("Cadastrado com sucesso!");
        console.log(this);
    }

    db.run(query, values, afterInsertData)

    // consultar dados da tabela
    function tableConsult() {
        db.all(`SELECT * FROM places`, function(err, rows) {
            if(err) {
                return console.log(err);
            }
    
            console.log("Aqui estão seus registros: ");
            console.log(rows);
        })
    }

    tableConsult();
    
    // deletar um dado da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
        if(err) {
            return console.log(err);
        }

        console.log("Registro deletado com sucesso!");
    })

    tableConsult();
}) */