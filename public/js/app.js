function getData(){
    document.getElementById('data').innerHTML = "";
    fetch('http://localhost:9999/user')
    .then(response => response.json())
    .then(data => {
        data.users.forEach(user => {
            document.getElementById('data').innerHTML += `
                <div class="user-card" id="user-card-${user.ide}">
                    <h3>
                        ${user.nombre} ${user.apellido}
                    </h3>
                    <span>
                        ${user.correo}
                    </span>
                    <span>
                        ${user.numero_telefono}
                    </span>
                    <span>
                        ${user.direccion}
                    </span>
                    <button value="${user.id}" onclick="editData(${user.id})">
                        Editar
                    </button>
                    <button value="${user.id}" onclick="deleteItem(${user.id})">
                        Eliminar
                    </button>
                    <span value="${user.id}">
                        ${user.fecha_creacion}
                    </span>
                </div>
            `
        });
    })

}

getData();

function deleteItem(id){
    fetch(`http://localhost:9999/user/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        getData();
    })
}

function saveData() {
    

}

function editData(id) {
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var correo = document.getElementById('correo');
    var direccion = document.getElementById('direccion');
    var numero_telefono = document.getElementById('numero_telefono');

    saveData()
}

const btn = document.getElementById('boton')
    btn.addEventListener('click', (e) => {
    e.preventDefault();
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var correo = document.getElementById('correo');
    var direccion = document.getElementById('direccion');
    var numero_telefono = document.getElementById('numero_telefono');
    
    fetch('http://localhost:9999/user', {
        method: 'POST',
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
})