
    
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
    