const registro = document.getElementById('registro');
const login = document.getElementById('login');

function loginFunction() {
    var username = document.getElementById('user-login');
    var password = document.getElementById('password-login');

    fetch('http://localhost:9999/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        })
    })
    .then(response => {
        if (response.ok) {

            console.log(response)
            alert('Usuario autenticado')
            username.value = '';
            password.value = '';
            window.location.href = '/user/view'
        } else {
            if (response.status = 401) {
                console.log("Credenciales incorrectas", response)
                alert('Credenciales incorrectas')

            }
        }
    })

};

function registroFunction() {
    var username = document.getElementById('user');
    var password = document.getElementById('password');

    fetch('http://localhost:9999/auth/registro', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Usuario registrado')
            username.value = '';
            password.value = '';
        }
    })

};

registro.addEventListener('submit', function(e) {
    e.preventDefault();
    registroFunction();


});

login.addEventListener('submit', function(e) {
    e.preventDefault();
    loginFunction();


});