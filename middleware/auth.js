const jwt = require('jsonwebtoken');

const auth = (request, response, next) => {
    const token = request.cookies.token

    if (!token) {
        return response.status(401).send("No puedes ver esto, no estas autenticado")
    }

    jwt.verify(token, "Hola", (error, user) => {
        if (error) {
            return response.status(403).send("No puedes ver esto, autenticacion fallido")
        }
        request.user = user;
        next();
    })

}

module.exports = auth