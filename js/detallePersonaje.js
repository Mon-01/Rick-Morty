const personajeDetalle = document.getElementById('personajeDetalle');
const idPersonaje = localStorage.getItem('idPersonajeSeleccionado');

if (!idPersonaje) {
  personajeDetalle.innerHTML = '<p>No se seleccionó ningún personaje.</p>';
} else {
  fetch(`https://rickandmortyapi.com/api/character/${idPersonaje}`)
    .then(res => {
      if (!res.ok) throw new Error('Error al obtener personaje');
      return res.json();
    })

    .then(personaje => {
      const episodiosNumeros = personaje.episode.map(url => url.split('/').pop());
      const episodiosStr = episodiosNumeros.join(', ');
      personajeDetalle.innerHTML = `
        <div class="card mx-auto" style="max-width: 400px;">
          <img src="${personaje.image}" class="card-img-top" alt="Foto de ${personaje.name}">
          <div class="card-body">
            <h5 class="card-title">${personaje.name}</h5>
            <ul class="list-unstyled">
              <li><strong>Estado:</strong> ${personaje.status}</li>
              <li><strong>Especie:</strong> ${personaje.species}</li>
              <li><strong>Origen:</strong> ${personaje.origin.name}</li>
              <li><strong>Género:</strong> ${personaje.gender}</li>
              <li><strong>Ubicación:</strong> ${personaje.location.name}</li>
              <li><strong>Episodios:</strong> ${episodiosStr}</li>
            </ul>
          </div>
        </div>
      `;
    })
    .catch(error => {
      personajeDetalle.innerHTML = '<p>Error al cargar el personaje.</p>';
      console.error(error);
    });
}
