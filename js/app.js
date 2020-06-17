//esta me interesa

//console.log(e.target.classList);

//variables

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBTN = document.getElementById('vaciar-carrito');


// Listeners
cargarEventListeners();

function cargarEventListeners() {
    //DIspara cuando se preciona agregar carrito
    cursos.addEventListener('click', comprarCurso);
    // cuando se elimina un curso
    carrito.addEventListener('click', eliminarCurso);
    //vaciar el carrito
    vaciarCarritoBTN.addEventListener('click', vaciarCarrito);

    // cargar el documento y cargar en localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}


// funciones

//funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    //Delegation para agregar al carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // se envia los datos del curso seleccionado
        leerDatosCurso(curso);
    }

}
//leer los datos del curso
function leerDatosCurso(curso) {

    const infoCurso = {
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id: curso.querySelector('a').getAttribute('data-id')
        }
        //console.log(curso);
        //console.log(infoCurso);

    insertarCarrito(infoCurso);

}

//muestra el curso seleccionado en el carrito

function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${curso.imagen}"width=100 >
    </td>

    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    `;

    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);

}

//elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    let curso,
        cursoId;

    if (e.target.classList.contains('borrar-curso')) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        //console.log(cursoId);

    }
    eliminarCursoLocalStorage(cursoId);
}
//elimina los cursos del carrito en el dom
function vaciarCarrito() {
    //forma lenta
    //listaCursos.innerHTML = '';
    //forma rapida y recomendada
    //con firstChild checa si hay un elemento
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild)
    }

    //vasiar carrito de localStorage
    vaciarLocalStorage();

    return false;
}

//almacena cursos en el carrito a local storage

function guardarCursoLocalStorage(curso) {

    let cursos;
    //toma el  valor  del areglo en localStorage
    cursos = obtenerCursosLocalStorage();
    // el curso seleccionado se agrega al areglo
    cursos.push(curso);
    //setItem solo rescrive
    localStorage.setItem('cursos', JSON.stringify(cursos));

}
//comprueva que haya elementos en localstorage
function obtenerCursosLocalStorage() {
    let cursosLS;
    //comprovamos si hay algo en localstorage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//Imprime los cursos de localStorage en el carrito

function leerLocalStorage() {
    let cursosLS = obtenerCursosLocalStorage();
    //console.log(cursosLS);
    cursosLS.forEach(function(curso) {
        //construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
    <td>
        <img src="${curso.imagen}"width=100 >
    </td>

    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    `;
        listaCursos.appendChild(row);
    });
}

//eliminar el curso de localStorage por el id

function eliminarCursoLocalStorage(curso) {

    let cursosLS;

    //console.log(curso);
    //obtenemos el areglo de los cursos
    cursosLS = obtenerCursosLocalStorage();
    //iteramos comparando el id del curso borrado con lso del local storage
    cursosLS.forEach(function(cursoLS, index) {
        if (cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
    //console.log(cursosLS);
    //añadimos el areglo actual a localStorage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));

}

//elimina todos los cursos de local Storage

function vaciarLocalStorage() {
    localStorage.clear();
}