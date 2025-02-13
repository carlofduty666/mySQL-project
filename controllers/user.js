const express = require('express');
const router = express.Router();
const { User }  = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// router.get('/view', (request, response) => {
//     const info = {
//         id: 1,
//         nombre: 'Act c/s 🔥'
//     }
//     response.render('index', info); // <---- AQUI renderizas HTML
// });

router.get('/auth', (request, response) => {
    response.render('user');
});

router.post('/login', (request, response) => {
    const {username, password} = request.body;

    User.loginUser(username, (error, result) => {
        if (error) {
            console.log('Error al iniciar sesion:', error);
            response.status(500).send('Error al iniciar sesion')
            return;
        }
        if (result.length === 0) {
            response.status(401).send('Usuario no encontrado');
            return;
        }
        const user = result[0];

        bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
                console.log(error);
                response.status(500).send('Error al verificar contraseña');
                return;
            }
            if (!isMatch) {
                response.status(401).send('Usuario incorrecto')
                return;

            }
            const token = jwt.sign({ id: user.id }, 'hola', { expiresIn: '1h'})
            console.log(token);
            response.status(200).send({token})
        })
    })

})

router.post('/registro', (request, response) => {
    const { username, password} = request.body;

    bcrypt.hash(password, 10, (error, hash) => {
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