import http from 'node:http'
import { json } from './middlewares/json.js';
import { routes } from './routes.js'

// Formas de uma aplicação(front-end) consumindo nossa API enviar infos para nossa API
// 1 - Query Parameters: userId -> chave; 1 -> valor (uso para URL Stateful e infos não sensíveis => filtros, paginação, não-obrigatórios)
// 2 - Route Parameters: 1 -> usado para identificação de recurso
// 3 - Request Body: Envio de informações de um formulário geralmente (passam pelo protocolo HTTPs, ou seja, muito mais difíceis de serem descriptografados)

// Exemplos:

// 1 - http://localhost:3333/users?userId=1&name=Douglas ; caso queira informar mais parâmetros, uso o '&'
// 2 - GET http://localhost:3333/users/1 ; estou buscando usuário com id 1 ; o método http basicamente já diz o que o 1 significa
// 2 - é uma combinação de método(GET) + recurso(users) + Route Parameter para entender o que a rota quer dizer
// 1 e 2 - ficam na URL - ambos não devem ser usados para envio de informações sensíveis. ex: passwords
// 3 - POST http://localhost:3333/users

// Edição e Remoção de usuário:


const server = http.createServer(async (request, response) => {
    const { method, url } = request;

    await json(request, response)

    const route = routes.find(route => {
        return route.method === method && route.path === url
    })

    if(route){
        return route.handler(request, response)
    }

    return response.writeHead(404).end('Página não encontrada!')
})

server.listen(3333)
