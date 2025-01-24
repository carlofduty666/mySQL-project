const express = require('express');
const { db } = require('./db/db');
const app = express();
const path = require('path');


const userController = require('./controllers/users');

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.send('Fher es culón')
})

// app.get('/data', (request, response) => {
//     const consulta = 'SELECT * FROM usuarios';

//     db.query(consulta, (error, result) => {  // Corrige aquí
//         if (error) {
//             console.log('Error al ejecutar la consulta');
//             response.status(500).send('Error al ejecutar la consulta');
//             return;
//         }
//         response.json(result);
//     });
// });

app.use('/user', userController);

db.connect((error) => {
    if (error) {
        console.log('Error de conexion')
        return;
    }
    console.log('Conexión exitosa a la base de datos');
    app.listen(9999, () => {
        console.log('Servidor corriendo en: http://localhost:9999')
    })
});


