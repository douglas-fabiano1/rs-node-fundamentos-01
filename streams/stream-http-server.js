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

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req){
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()
  console.log(fullStreamContent)

  res.end(fullStreamContent)
})

server.keepAliveTimeout = 120000
server.headersTimeout = 120000

server.listen(3334, () => {
  console.log('Servidor escutando em http://localhost:3334')
})
