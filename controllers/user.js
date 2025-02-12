const express = require('express');
const router = express.Router();
const { User }  = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/view', (request, response) => {
    const info = {
        id: 1,
        nombre: 'Act c/s 🔥'
    }
    response.render('index', info); // <---- AQUI renderizas HTML
});

router.get('/', (request, response) => {
    User.getAllUsers((error, result) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            response.status(500).send('Error al ejecutar la consulta');
            return;
        }
        // response.render('user', { users: result });
        response.send({ users: result });
    });
});

router.get('/auth', (request, response) => {
    const { username, password } = request.body;

router.post('/login', (request, response) => {
    User.createUser(user, (error, result) => {
        if (error) {
            console.log('Error al actualizar el usuario:', error);
            response.status(500).send('Error al actualizar el usuario');
            return;
        }
        response.send({ mensaje: "Usuario actualizado exitosamente" });
    });
})

router.post('/registro', (request, response) => {
    const { username, password} = request.body;

    bcrypt.hash(username.password, 10, (error, hash) => {
        if (error) {
            console.log(error);
            response.status(500).send('Error al cifrar contraseña');
            return;
        }
        User.registerUser(username, hash, (error, result) => {
            if (error) {
                console.log('Error al crear el usuario:', error);
                response.status(500).send('Error al crear el usuario');
                return;
            }
            response.send({ mensaje: "Usuario creado exitosamente" });
    })
    });
})




module.exports = router;