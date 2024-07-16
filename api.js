const main = document.querySelector('main')
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(usuarios => {
    usuarios.forEach(usuario => {
      let infousuario = document.createElement('article');
      infousuario.classList.add("usuarios")
      infousuario.innerHTML = htmlUsuarios(usuario.id, usuario.name, usuario.username);
      main.appendChild(infousuario);
    });
  });

// Función para generar el HTML de cada usuario
function htmlUsuarios(id, name, username) {
  let html = `
    <h4 class="nombre">${name}</h4>
    <h5 class="username">${username}</h5>
    <button class="eliminar " data-id="${id}">Eliminar</button>
    <button class="modificar " data-id="${id}">Modificar</button>`;
  return html;
}

// Funcion para agregar nuevo usuario

function agregarUsuario(evt) {
  evt.preventDefault()
  const nuevoNombre = document.getElementById("nombre").value
  const NuevoUsername = document.getElementById("usuario").value
  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: nuevoNombre, username: NuevoUsername })
  })
    .then(response => response.json())
    .then(nuevoUsuario => {
      if (nuevoNombre != "" & NuevoUsername != "") {
      let infousuario = document.createElement('article');
      infousuario.classList.add("usuarios")
      infousuario.innerHTML = htmlUsuarios(nuevoUsuario.id, nuevoUsuario.name, nuevoUsuario.username);
      main.appendChild(infousuario);
      document.getElementById('nombre').value = '';
      document.getElementById('usuario').value = '';
      }
    })
}

const botonAgregarUsuarios = document.getElementById("agregar")
botonAgregarUsuarios.addEventListener("click", agregarUsuario)


// Función para eliminar usuario
function eliminarUsuario(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        //eliminar del DOM
        const usuarioAEliminar = document.querySelector(`button[data-id="${userId}"]`).parentNode;
        usuarioAEliminar.remove();
      } else {
        console.error('Error al eliminar usuario');
      }
    })
}

//Evento para eliminar usuario
main.addEventListener('click', event => {
  if (event.target.classList.contains('eliminar')) {
    const userId = event.target.getAttribute('data-id');
    eliminarUsuario(userId);
  }
})

// Función para modificar usuario
function modificarUsuario(userId) {
  const nombreNuevo = prompt("Ingrese el nuevo nombre:");
  const usernameNuevo = prompt("Ingrese el nuevo nombre de usuario:");
  if (nombreNuevo.trim() === "" || usernameNuevo.trim() === "") {
    alert("El nombre o el nombre de usuario no pueden estar vacíos.");
    return;   
  }
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: nombreNuevo, username: usernameNuevo })
  })
    .then(response => response.json())
    .then(usuarioActualizado => {
      const usuarioModificar = document.querySelector(`button[data-id="${userId}"]`).parentNode;
      usuarioModificar.querySelector('.nombre').textContent = usuarioActualizado.name;
      usuarioModificar.querySelector('.username').textContent = usuarioActualizado.username;
      
    })
}
main.addEventListener('click', event => {
  if (event.target.classList.contains('modificar')) {
    const userId = event.target.getAttribute('data-id');
    modificarUsuario(userId);
  }
})