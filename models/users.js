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
        const consulta = `SELECT * FROM usuarios WHERE nombre = '${nombre}'`; // Usa parámetros para evitar inyecciones SQL
        db.query(consulta, callback);
    },
    createUser: function(user,callback) {
        const consulta = `INSERT INTO usuarios (nombre, apellido, correo, direccion, numero_telefono) VALUES ("${user.nombre}", "${user.apellido}", "${user.correo}", "${user.direccion}", "${user.numero_telefono}")`;
        return db.query(consulta, callback);
    },
    deleteUser: function(id, callback) {
        const consulta = `DELETE FROM usuarios WHERE id = ${id}`;
        return db.query(consulta, callback);
    
    },
    updateUser: function(id, user, callback) {
        const consulta = `UPDATE usuarios SET nombre = '${nombre}', apellido = '${apellido}', correo = '${correo}', direccion = '${direccion}', numero_telefono = '${numero_telefono}' WHERE id = ${user.id}`;
        return db.query(consulta, callback);
    },
};


module.exports = { User }

