// Netflix & Spotify

// Importação de clientes via CSV (Excel)
// 1GB - 1.000MB(base decimal) ou 1024MB(base binária)
// POST /upload import.csv

// 10MB/s - 100s

// 100s -> inserção no BD

// 10MB/s -> +- 10.000

// Readable Streams / Writable Streams


// Streams ==>
// process.stdin
//    .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

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

class InvertSignStream extends Transform{
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

class MultiplyByTenStream extends Writable{
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InvertSignStream())
    .pipe(new MultiplyByTenStream())
