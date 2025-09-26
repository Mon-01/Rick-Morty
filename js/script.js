// let nombre = document.getElementById("navbar-container");
// if (nombre) {
//   fetch('navBar.html')
//     .then(response => response.text())
//     .then(html => {
//       nombre.innerHTML = html;
//     })
//     .catch(error => console.error('Error cargando el navbar:', error));
// } else {
//   fetch('navBarInicio.html')
//     .then(response => response.text())
//     .then(html => {
//       document.getElementById('navbar-container2').innerHTML = html;
//     })
//     .catch(error => console.error('Error cargando el navbar:', error));
// }

const characterUrl = "https://rickandmortyapi.com/api/character";
const rowPersonajes = document.getElementById("rowPersonajes");
const btnCargarMas = document.getElementById("btnCargarMas");
const especieSelect = document.getElementById("especies");
const origenSelect = document.getElementById("origen");
const generoSelect = document.getElementById("genero");

const especiesSet = new Set();
const origenesSet = new Set();
const generosSet = new Set();

let urlActual = characterUrl;

async function cargarOpcionesSelects() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();

    data.results.forEach(personaje => {
      if (personaje.species) especiesSet.add(personaje.species);
      if (personaje.origin && personaje.origin.name) origenesSet.add(personaje.origin.name);
      if (personaje.gender) generosSet.add(personaje.gender);
    });

    while (especieSelect.options.length > 1) especieSelect.remove(1);
    while (origenSelect.options.length > 1) origenSelect.remove(1);
    while (generoSelect.options.length > 1) generoSelect.remove(1);

    especiesSet.forEach(especie => {
      const option = document.createElement("option");
      option.value = especie;
      option.textContent = especie;
      especieSelect.appendChild(option);
    });

    origenesSet.forEach(origen => {
      const option = document.createElement("option");
      option.value = origen;
      option.textContent = origen;
      origenSelect.appendChild(option);
    });

    generosSet.forEach(genero => {
      const option = document.createElement("option");
      option.value = genero;
      option.textContent = genero;
      generoSelect.appendChild(option);
    });

  } catch (error) {
    console.error("Error cargando opciones para filtros:", error);
  }
}

async function cargarPersonajes(url) {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error('Error en la respuesta de personajes');
    const data = await respuesta.json();

    data.results.forEach(personaje => {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mx-auto');
      tarjeta.innerHTML = `
        <div class="card mb-4" style="cursor:pointer;" data-id="${personaje.id}">
          <img src="${personaje.image}" class="card-img-top" alt="foto de ${personaje.name}">
          <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <p class="card-text">
              <ul>
                <li>Estado: ${personaje.status}</li>
                <li>Especie: ${personaje.species}</li>
                <li>Origen: ${personaje.origin.name}</li>
                <li>Género: ${personaje.gender}</li>
              </ul>
            </p>
          </div>
        </div>
      `;
      rowPersonajes.appendChild(tarjeta);

      const card = tarjeta.querySelector('.card');
      card.addEventListener('click', () => {
        localStorage.setItem('idPersonajeSeleccionado', personaje.id);
        window.location.href = 'resultsCharacters.html';
      });
    });

    urlActual = data.info.next;

    if (!urlActual) {
      btnCargarMas.disabled = true;
      btnCargarMas.textContent = "No hay más personajes";
    }
    
  } catch (error) {
    console.error('Error al cargar los personajes:', error);
    rowPersonajes.innerHTML = '<p>Lo sentimos, hubo un error al obtener los datos.</p>';
  }
}

btnCargarMas.addEventListener('click', () => {
  if (urlActual) {
    cargarPersonajes(urlActual);
  }
});

window.onload = () => {
  cargarOpcionesSelects();
  cargarPersonajes(characterUrl);
};
