const buf = Buffer.from("Douglas")
// <Buffer 44 6f 75 67 6c 61 73>
// Node consegue trabalhar de maneira mais performática com hexadecimais
console.log(buf.toJSON())