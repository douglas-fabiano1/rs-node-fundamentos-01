// /users/:id
export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`) // query params são opcionais, a rota pode ter ou não
    // o ? após o (?<query>) diz isso; e o $ diz que não pode haver nada após isso
    // \\?(.*) para pegar tudo que vem após o ponto de interrogação
    // . qualquer caractere
    // * inúmeras vezes

    return pathRegex
}