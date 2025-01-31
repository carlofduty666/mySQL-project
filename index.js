const express = require('express');
const { db } = require('./db/db');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


const userController = require('./controllers/users');

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('bodyParser');

app.get('/', (request, response) => {
    const filePath = path.join(__dirname, 'views/index.html')
    response.sendFile(filePath)
})

// app.get('/', (req, res) => {
//     const filePath = path.join(__dirname, 'views/index.html')
//     res.sendFile(filePath)
// })

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


