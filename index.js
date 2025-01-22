const express = require('express');

const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'carlofdutyy',
    password: 'OW8Nu_ORE5)H*iPL',
    database: 'users'
});

db.connect((error) => {
    if (error) {
        console.log('Error de conexion')
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

app.get('/', (request, response) => {
    response.send('Fher es culón')
})

app.get('/data', (request, response) => {
    const consulta = 'SELECT * FROM usuarios';

    db.query(consulta, (error, result) => {  // Corrige aquí
        if (error) {
            console.log('Error al ejecutar la consulta');
            response.status(500).send('Error al ejecutar la consulta');
            return;
        }
        response.json(result);
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en: http://localhost:3000')
})

