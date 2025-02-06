const btn = document.getElementById('boton')
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
                    <button value="${user.id}" onclick="editData('PUT', ${user.id})">
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

function editData(method, id) {
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var correo = document.getElementById('correo');
    var direccion = document.getElementById('direccion');
    var numero_telefono = document.getElementById('numero_telefono');

    var user = document.getElementById(`user-card-${id}`);
    nombre.value = user.querySelector('.nombre').innerText;
    apellido.value = user.querySelector('.apellido').innerText;
    correo.value = user.querySelector('.correo').innerText;
    direccion.value = user.querySelector('.direccion').innerText;
    // numero_telefono.value = document.querySelector('.numero_telefono')[0].innerText;

    let rawTelefono = user.querySelector('.numero_telefono')?.innerText || "";
    numero_telefono.value = rawTelefono.trim(); // Remove leading/trailing spaces!


    // btn.removeEventListener('click', (e) => {
    //     e.preventDefault();
    //     saveData("POST");
    // })

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        saveData(method, id);
    })
}

// function editData(id) {
//     var nombre = document.getElementById('nombre');
//     var apellido = document.getElementById('apellido');
//     var correo = document.getElementById('correo');
//     var direccion = document.getElementById('direccion');
//     var numero_telefono = document.getElementById('numero_telefono');

//     var user = document.getElementById(`user-card-${id}`);

//     nombre.value = user.querySelector('.nombre').innerText;
//     apellido.value = user.querySelector('.apellido').innerText;
//     correo.value = user.querySelector('.correo').innerText;
//     direccion.value = user.querySelector('.direccion').innerText;
//     // numero_telefono.value = document.querySelector('.numero_telefono')[0].innerText;

//     let rawTelefono = user.querySelector('.numero_telefono')?.innerText || "";
//     numero_telefono.value = rawTelefono.trim(); // Remove leading/trailing spaces!

//     fetch('http://localhost:9999/user', {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             id: id,
//             nombre: nombre.value,
//             apellido: apellido.value,
//             correo: correo.value,
//             direccion: direccion.value,
//             numero_telefono: numero_telefono.value
//         })
//     })
//     .then(response => {
//         if (response.ok) {
//             alert('Usuario creado correctamente')
//             getData();
//             nombre.value = '';
//             apellido.value = '';
//             correo.value = '';
//             direccion.value = '';
//             numero_telefono.value = '';
//         } else {
//             alert('Error al crear el usuario')
//         }
//         return response.json()
//     })
//     .then(data => {
//         console.log(data)
//     })
    
// }

function saveData(method, id = "") {
    
var nombre = document.getElementById('nombre');
var apellido = document.getElementById('apellido');
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
        direccion.value = '';
        numero_telefono.value = '';
    } else {
        alert('Error al crear el usuario')
    }
    return response.json()
})
.then(data => {
    console.log(data)
})

}


