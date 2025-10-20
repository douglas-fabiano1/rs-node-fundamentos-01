import http from 'node:http'

const server = http.createServer((request, response) => {
    return response.end('Fritas')
})

server.listen(3333)
