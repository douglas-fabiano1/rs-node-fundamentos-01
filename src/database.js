// { "users": [...] } 

export class Database {
    #database = {}

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

        return data
    }
}