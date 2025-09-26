let nombre =  document.getElementById("navbar-container");
if(nombre){
       fetch('navBar.html')
      .then(response => response.text())
      .then(html => {
        nombre.innerHTML = html;
      })
      .catch(error => console.error('Error cargando el navbar:', error));
}else{
    fetch('navBarInicio.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('navbar-container2').innerHTML = html;
      })
      .catch(error => console.error('Error cargando el navbar:', error));
    }

const characterUrl = "https://rickandmortyapi.com/api/character";
const locationsUrl = "https://rickandmortyapi.com/api/location";
const rowPersonajes = document.getElementById("rowPersonajes");
const btnCargarMas = document.getElementById("btnCargarMas");

let urlActual = characterUrl;

async function cargarPersonajes(url) {
  try {
    const respuesta = await fetch(url);
    const data = await respuesta.json();

    data.results.forEach(personaje => {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mx-auto');
      tarjeta.innerHTML = `
        <div class="card mb-4">
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
  cargarPersonajes(characterUrl);
};


