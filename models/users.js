const { db } = require('../db/db');

const User = {
    getAllUsers: function(callback) {
        const consulta = 'SELECT * FROM usuarios';
        return db.query(consulta, callback);
    },
    getUserById: function(id, callback) {  // Agrega el callback aquí
        const consulta = `SELECT * FROM usuarios WHERE id = ${id}`; // Usa parámetros para evitar inyecciones SQL
        db.query(consulta, callback);
    },
    getUserByName: function(nombre, callback) {  // Asegúrate de usar un parámetro correcto aquí
        const consulta = `SELECT * FROM usuarios WHERE nombre = ${nombre}`; // Usa parámetros para evitar inyecciones SQL
        db.query(consulta, callback);
    },
    createUser: function() {
    
    },
    deleteUser: function() {
    
    },
    updateUser: function() {
    
    },
};


module.exports = { User }

