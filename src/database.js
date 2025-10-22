// { "users": [...] } 
import fs from 'node:fs/promises'
import { URL } from 'node:url'

// Deixa a criação do arquivo db.json relativa ao arquivo database.js
const databasePath = new URL('../db.json', import.meta.url)
console.log(databasePath)

export class Database {
    #database = {}
    
    constructor(){
        fs.readFile(databasePath, 'utf8')
            .then(data => {
                this.#database = JSON.parse(data) // parse para parsear os dados
            }).catch(() => {
                this.#persist() // Cria o arquivo, mesmo se estiver vazio.
            })
    }

    // Método que vai escrever o nosso BD em um arquivo físico.
    // stringify para escrever os dados
    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    // Método de seleção da tabela
    select(table) {
        // verifica se há uma chave no BD com o nome de tabela,
        // caso não exista, retorna array vazio.
        const data = this.#database[table] ?? []

        return data
    }

    // Método de inserção de dados na tabela
    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }
}