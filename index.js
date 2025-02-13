const express = require('express');
const { db } = require('./db/db');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



const userController = require('./controllers/users');
const userControllerAuth = require('./controllers/user');


const auth = require('./middleware/auth');

const { User } = require('./models/users');
const upload = require('./middleware/upload');
const { request } = require('http');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('bodyParser');

app.get('/', auth, (request, response) => { // si quisiera proteger esta ruta, se debe agregar el middleware auth.js y luego escribo aqui el nombre de esa constante (en este caso: auth / usuario: carlos2, password: hola)
    response.render('file')
})

app.post('/file-upload', upload.single('file'), (request, response) => {
    if (!request.file) {
        return response.status(400).send('No se subió ningún archivo');
    }
    const user = {
        username: request.file.originalname,
        password: request.file.filename,
        rol: "user",
    }
    User.createUser(user, (error, result) => {
        if (error) {
            console.log('Error al crear el usuario:', error);
            response.status(500).send('Error al crear el usuario');
            return;
        }

    });
    console.log(request.file.originalname);
    response.status(200).send({message: 'Archivo subido'})
})

// app.post('/file-upload', upload.single('file'), (request, response) => {
//     if (!request.file) {
//         return response.status(400).send('No subio ningun archivo');
//     }
//     response.status(200).send({message: "Archivo subido"})
// })

app.use('/user', userController);
app.use('/auth', userControllerAuth);

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


