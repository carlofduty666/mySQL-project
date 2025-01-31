const express = require('express');
const router = express.Router();
const { User }  = require('../models/users');

router.get('/', (request, response) => {
    User.getAllUsers((error, result) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            response.status(500).send('Error al ejecutar la consulta');
            return;
        }
        response.render('user', { users: result });
    });
});

router.get('/:id', (request, response) => {
    User.getUserById(request.params.id, (error, result) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return response.status(500).send('Error al ejecutar la consulta');
        }
        if (!result) {
            console.log('No se encontró el usuario con ID:', request.params.id);
            return response.status(404).send('Usuario no encontrado');
        }
        response.render('user', { users: result });
    });
});

router.get('/user/:nombre', (request, response) => {
    User.getUserByName(request.params.nombre, (error, result) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return response.status(500).send('Error al ejecutar la consulta');
        }
        if (!result) {
            console.log('No se encontró el usuario con nombre:', request.params.nombre);
            return response.status(404).send('Usuario no encontrado');
        }
        response.render('user', { users: result });
    });
});

module.exports = router;