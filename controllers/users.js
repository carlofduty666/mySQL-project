const express = require('express');
const router = express.Router();
const { User }  = require('../models/users');

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

router.get('/id/:id', (request, response) => {
    User.getUserById(request.params.id, (error, result) => {
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return response.status(500).send('Error al ejecutar la consulta');
        }
        if (!result) {
            console.log('No se encontró el usuario con ID:', request.params.id);
            return response.status(404).send('Usuario no encontrado');
        }
        // response.render('index', { users: result });
        response.render('index', {
            id: 1,
            nombre: 'Act c/s 🔥',
            users: result
        });
    });
});

router.get('/name/:nombre', (request, response) => {
    User.getUserByName(request.params.nombre, (error, result) => {
        console.log(result);
        if (error) {
            console.error('Error al ejecutar la consulta:', error);
            return response.status(500).send('Error al ejecutar la consulta');
        }
        if (!result) {
            console.log('No se encontró el usuario con nombre:', request.params.nombre);
            return response.status(404).send('Usuario no encontrado');
        }
        response.render('index', { users: result });
    });
});

router.post('/', (request, response) => {
    const user = request.body;
    User.createUser(user, (error, result) => {
        if (error) {
            console.log('Error al crear el usuario:', error);
            response.status(500).send('Error al crear el usuario');
            return;
        }
        // response.send( { users: result } );
        response.render('index', {
            id: 1,
            nombre: 'Act c/s 🔥',
            users: result
        });
    });
})

router.put('/', (request, response) => {
    const user = request.body;
    console.log(request.body);
    User.updateUser(user, (error, result) => {
        if (error) {
            console.log('Error al actualizar el usuario:', error);
            response.status(500).send('Error al actualizar el usuario');
            return;
        }
        response.send({ mensaje: "Usuario actualizado exitosamente" });
    });
})

router.delete('/:id', (request, response) => {
    console.log(request.body);
    User.deleteUser(request.params.id, (error, result) => {
        if (error) {
            console.log('Error al eliminar el usuario:', error);
            response.status(500).send('Error al eliminar el usuario');
            return;
        }
        response.send({ mensaje: "Usuario eliminado exitosamente" });
    });
})



module.exports = router;