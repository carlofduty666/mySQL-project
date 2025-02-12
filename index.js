const express = require('express');
const { db } = require('./db/db');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



const userController = require('./controllers/users');
// const userControllerAuth = require('./controllers/user');

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('bodyParser');

app.get('/', (request, response) => {
    response.send('Hola Fher')
})

app.use('/user', userController);
// app.use('/user', userControllerAuth);

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


