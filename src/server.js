import http from 'node:http'

// Array users
const users = []

const server = http.createServer((request, response) => {
    const {method, url } = request;

    if (method === 'GET' && url === '/users') {
        // Early return
        return response
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users'){
        users.push({
            id: 1,
            name: 'Douglas',
            email: 'douglas@example.com'
        })
        return response.writeHead(201).end()
    }

    return response.writeHead(404).end('Página não encontrada!')
})

server.listen(3333)
