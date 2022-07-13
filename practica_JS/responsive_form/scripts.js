// RESPONSIVE FORM FUNCTIONS
// Se tiene que crear una función, con la cual usaremos de filtro. Es importante pasar todo a mayúsculas para no tener
// inconvenientes con el ingreso de las palabras.

// Traemos las etiquetas, pero en este caso en especial, será dentro de una función
function filtro() {

  let search = document.getElementById("searchInput").value.toUpperCase(); // Tood ingreso pasa a mayusculas
  let names = document.getElementById("table_names");
  // el tagname lo traemos del tbody que almacenamos en la variable names
  let tags = names.getElementsByTagName("tr");
  
  // podemos iterar por las filas
  for(let i=0; i < tags.length; i++) {
    // por cada iteración consultamos a la columna lenguaje
    let columnLanguage = tags[i].getElementsByTagName("td")[2];
    // extrae el contenido de cada celda
    let language = columnLanguage.textContent;
    // ahora hacemos que se muestren o se oculten las filas
    tags[i].style.display = language.toUpperCase().indexOf(search) > -1 ? "" : "none";
  }

}

// ahora llamamos a nuestra function 
document.getElementById("searchInput").addEventListener('keyup', filtro);