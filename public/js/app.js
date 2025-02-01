fetch('http://localhost:9999/user')
.then(response => response.json())
.then(data => console.log(data))