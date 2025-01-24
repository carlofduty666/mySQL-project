const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', (request, response) => {
    User.getAllUsers((error, result) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            response.status(500).send('Error al ejecutar la consulta');
            return;
        }
    });
    response.render('user', { users: result});
});

router.get('/:id', (request, response) => {
    User.getUserById(request.params.id, (error, result) => {
    if (error) {
            console.log('Error al ejecutar la consulta');
            response.status(500).send('Error al ejecutar la consulta');
            return;
        }
        response.render('user', { users: result});
    });
})

module.exports = router;