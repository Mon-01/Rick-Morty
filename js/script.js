
    fetch('navBar.html')
      .then(response => response.text())
      .then(html => {
        document.getElementById('navbar-container').innerHTML = html;
      })
      .catch(error => console.error('Error cargando el navbar:', error));
  