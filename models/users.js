const db = require('../db/db');

const User = {
    geatAllUsers: function(callback) {
        const consulta = 'SELECT * FROM usuarios';
        return db.query(consulta, callback);
    },
    getUserById: function(id) {
        const consulta = `SELECT * FROM usuarios WHERE id = ${id}`;
        db.query(consulta, (error, result) => {  // Corrige aquí
            if (error) {
                console.log('Error al ejecutar la consulta');
                response.status(500).send('Error al ejecutar la consulta');
                return;
            }
            return result;
        });
    },
    getUserByName: function(id) {
        const consulta = `SELECT * FROM usuarios WHERE id = ${nombre}`;
        db.query(consulta, (error, result) => {  // Corrige aquí
            if (error) {
                console.log('Error al ejecutar la consulta');
                response.status(500).send('Error al ejecutar la consulta');
                return;
            }
            return result;
        });
    },
    createUser: function() {

    },
    deleteUser: function() {

    },
    updateUser: function() {
    
    },
}

module.exports = { User }