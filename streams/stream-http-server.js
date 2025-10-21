import http from 'node:http'
import { Transform } from 'node:stream'

class InvertSignStream extends Transform {
  _transform(chunk, encoding, callback) {
    const num = Number(chunk.toString())
    console.log('Recebido:', num)

    const transformed = num * -1
    callback(null, Buffer.from(String(transformed)))
  }
}

// req => ReadableStream
// res => WritableStream

// Criação do servidor
const server = http.createServer((req, res) => {
  // Definindo headers para manter a conexão aberta e transmitir em partes
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Transfer-Encoding', 'chunked')

  // Pipe do corpo da requisição para o transformador e depois para a resposta
  req
    .pipe(new InvertSignStream())
    .pipe(res)
})

// Ajuste opcional para evitar timeout automático (até 2 minutos)
server.keepAliveTimeout = 120000
server.headersTimeout = 120000

// Inicia o servidor na porta 3334
server.listen(3334, () => {
  console.log('Servidor escutando em http://localhost:3334')
})
