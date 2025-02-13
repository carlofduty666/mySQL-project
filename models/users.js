const { db } = require('../db/db');

const User = {
    getAllUsers: function(callback) {
        const consulta = 'SELECT * FROM usuarios';
        return db.query(consulta, callback);
    },
    getUserById: function(id, callback) {  // Agrega el callback aquí
        const consulta = `SELECT * FROM usuarios WHERE id = ?`; // Usa parámetros para evitar inyecciones SQL
        return db.query(consulta, [id], callback);
    },
    getUserByName: function(nombre, callback) {  
        const consulta = 'SELECT * FROM usuarios WHERE nombre = ?'; // Usar un marcador de posición
        return db.query(consulta, [nombre], callback); // Pasar el nombre como parámetro
    },
    createUser: function(user, callback) {
        const consulta = `INSERT INTO usuarios
        (nombre, apellido, username, password, rol, correo, direccion, numero_telefono) 
        VALUES 
        ("${user.nombre}", "${user.apellido}",
        "${user.username}", "${user.password}",
        "user", "${user.correo}",
        "${user.direccion}", "${user.numero_telefono}")`;
        return db.query(consulta, callback);
    },
    deleteUser: function(id, callback) {
        const consulta = `DELETE FROM usuarios WHERE id = ?`;
        return db.query(consulta, [id], callback);  
    
    },
    updateUser: function(user, callback) {
        const consulta = `UPDATE usuarios SET nombre = "${user.nombre}", apellido = "${user.apellido}", username = "${user.username}", password = "${user.password}", rol = "${user.rol}", correo = "${user.correo}", direccion = "${user.direccion}", numero_telefono = "${user.numero_telefono}" WHERE id = ${user.id}`;
        return db.query(consulta, callback);
    },
    registerUser: function(username, hash, callback) {
        const consulta = `INSERT INTO usuarios
        (nombre, apellido, username, password, rol, correo, direccion, numero_telefono) 
        VALUES 
        ("${username.nombre}", "${username.apellido}",
        "${username}", "${hash}",
        "user", "${username.correo}",
        "${username.direccion}", "${username.numero_telefono}")`;
        return db.query(consulta, callback);
    },
    loginUser: function(username, callback) {
        const consulta = `SELECT * FROM usuarios WHERE username = "${username}"`;
        return db.query(consulta, callback);
    }
};


module.exports = { User }

