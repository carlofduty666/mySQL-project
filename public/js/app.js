const btn = document.getElementById('boton');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    createData();
});
const btn2 = document.getElementById('boton2')

var user_id;

function getData(){
    document.getElementById('data').innerHTML = "";
    fetch('http://localhost:9999/user')
    .then(response => response.json())
    .then(data => {
        data.users.forEach(user => {
            document.getElementById('data').innerHTML += `
                <div class="user-card" id="user-card-${user.id}">
                    <div class="user-card-header" style="flex-direction: row; display: flex; gap: 0.5rem;">
                    <h3 class="nombre">
                            ${user.nombre}
                        </h3>
                        <h3 class="apellido">
                            ${user.apellido}
                        </h3>
                    </div>
                    <span class="username">
                        ${user.username}
                    </span>
                    <span class="password">
                        ${user.password}
                    </span>
                    <span class="rol">
                        ${user.rol}
                    </span>
                    <span class="correo">
                        ${user.correo}
                    </span>
                    <span class="numero_telefono">
                        ${user.numero_telefono}
                    </span>
                    <span class="direccion">
                        ${user.direccion}
                    </span>
                    <span value="${user.id}">
                        ${user.fecha_creacion}
                    </span>
                    <button value="${user.id}" onclick="editData(${user.id})">
                        Editar
                    </button>
                    <button value="${user.id}" onclick="deleteItem(${user.id})">
                        Eliminar
                    </button>

                </div>
                        `
                    });
    })
    
}

getData();


function deleteItem(id){
    fetch(`http://localhost:9999/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert('Usuario eliminado correctamente')
            getData();
        }
    })
}

function createData() {
    
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var rol = document.getElementById('rol');
    var correo = document.getElementById('correo');
    var direccion = document.getElementById('direccion');
    var numero_telefono = document.getElementById('numero_telefono');


    fetch('http://localhost:9999/user', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre.value,
            apellido: apellido.value,
            username: username.value,
            password: password.value,
            rol: rol.value,
            correo: correo.value,
            direccion: direccion.value,
            numero_telefono: numero_telefono.value
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Usuario creado correctamente')
            getData();
            nombre.value = '';
            apellido.value = '';
            correo.value = '';
            username.value = '';
            password.value = '';
            rol.value = '';
            direccion.value = '';
            numero_telefono.value = '';
        }
    })


}

function editData(id) {
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var rol = document.getElementById('rol');
    var correo = document.getElementById('correo');
    var direccion = document.getElementById('direccion');
    var numero_telefono = document.getElementById('numero_telefono');

    var user = document.getElementById(`user-card-${id}`);

    nombre.value = user.getElementsByClassName('nombre')[0].innerText;
    apellido.value = user.getElementsByClassName('apellido')[0].innerText;
    username.value = user.getElementsByClassName('username')[0].innerText.trim();
    password.value = user.getElementsByClassName('password')[0].innerText.trim();
    rol.value = user.getElementsByClassName('rol')[0].innerText.trim();
    correo.value = user.getElementsByClassName('correo')[0].innerText.trim();
    direccion.value = user.getElementsByClassName('direccion')[0].innerText;
    // numero_telefono.value = user.getElementsByClassName('numero_telefono')[0].innerText;
    
    let rawTelefono = user.getElementsByClassName('numero_telefono')[0]?.innerText || "";
    numero_telefono.value = rawTelefono.trim(); // Remove leading/trailing spaces!


    user_id = id;

    
}

btn2.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(user_id);
    saveData(user_id);
})


function saveData(id) {
    
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var rol = document.getElementById('rol');
    var correo = document.getElementById('correo');
    var direccion = document.getElementById('direccion');
    var numero_telefono = document.getElementById('numero_telefono');
    
    
        fetch('http://localhost:9999/user', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                nombre: nombre.value,
                apellido: apellido.value,
                username: username.value,
                password: password.value,
                rol: rol.value,
                correo: correo.value,
                direccion: direccion.value,
                numero_telefono: numero_telefono.value
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Usuario actualizado!')
                getData();
                nombre.value = '';
                apellido.value = '';
                correo.value = '';
                username.value = '';
                password.value = '';
                rol.value = '';
                direccion.value = '';
                numero_telefono.value = '';
            }
        })
    
 }


