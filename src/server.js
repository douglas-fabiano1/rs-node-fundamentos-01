import http from 'node:http'
import { json } from './middlewares/json.js';
import { routes } from './routes.js'

const server = http.createServer(async (request, response) => {
    const { method, url } = request;

    await json(request, response)

    // verifica se a rota existe
    const route = routes.find(route => {
        return route.method === method && route.path === url
    })

    // caso tenha encontrado a rota
    if(route){
        return route.handler(request, response)
    }

    return response.writeHead(404).end('Página não encontrada!')
})

server.listen(3333)
