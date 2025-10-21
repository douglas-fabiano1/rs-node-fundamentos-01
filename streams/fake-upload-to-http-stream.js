import { Readable } from 'node:stream'

// Stream que envia números de 1 a 100, um por segundo
class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000)
  }
}

// Envia o stream para o servidor via fetch
fetch('http://localhost:3334', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
  },
  body: Readable.toWeb(new OneToHundredStream()), // conversão para Web Stream
  duplex: 'half', // necessário para streaming no fetch
})
  .then(res => res.text())
  .then(data => {
    console.log('Resposta do servidor:')
    console.log(data)
  })
  .catch(err => {
    console.error('Erro ao enviar stream:', err)
  })