const jwt = require('jsonwebtoken');

const auth = (request, response, next) => {

    const token = request.cookies.token; // es para obtener el token del cookie
    if (!token) {
        return response.status(401).send('Necesitas autenticarte para ver esto');

    }

    jwt.verify(token, 'hola', (error, user) => {
        if (error) {
            return response.status(403).send('No estas autorizado para ver esto, autenticacion fallida');

        }
        request.user = user;
        next(); // esta funcion se ejecuta primero en el archivo users.js y luego se ejecuta el codigo del controlador ../controllers\users.js
    })
 
}

module.exports = auth