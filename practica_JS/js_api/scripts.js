const form = document.getElementById('form')
const keys = document.getElementById('keys')

// entender que sessionStorage funciona hasta que se cierra el navegador, siempre nos pide una KEY y un VALUE,ambos serán strings
// SIEMPRE TIENE QUE HABER UNA 'KEY' Y UN 'VALUE', el value puede ser un objeto JS
// mientras que localStorage almacena en el ordenador local

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const person = {
    name: 'Nakio',
    surname: 'Kolke'
  }
  // para navegadores antiguos se puede preguntar si existe el localStorage => if(localStorage)
  // sessionStorage.setItem('name', 'Nakio')
  sessionStorage.setItem(`${person.name}`, `${person.surname}`)
  // otra forma, recordar que son string y por ello tenemos que usar JSON.stringify, en el caso de que querramos recuperar el objeto tendremos que hacer un JSON.parse
  sessionStorage.setItem('person', JSON.stringify(person))
  // si queremos acceder a los datos del formulario tenemos podemos hacer lo siguiente. Como ya tenemos acceso al formulario, 
  // ahora tenemos que acceder a sus datos =>
  sessionStorage.setItem(form.key.value, form.value.value)
  localStorage.setItem(form.key.value, form.value.value)

  // podemos agregar los campos al select
  keys.innerHTML += `<option>${form.key.value}</option>`

  form.reset()
})

// si quiero tomar los valores que tiene el select, lo que tenemos que hacer es colocarle un addEventListener, 'change'
keys.addEventListener('change', () => {
  // o lo coloco dentro de una variable o puedo directamente colocarlo en el elemento del HTML =>
  // const keyName = sessionStorage.getItem(keys[keys.selectedIndex].textContent)
  const keyName = localStorage.getItem(keys[keys.selectedIndex].textContent)
  // document.getElementById('infoValue').textContent = keyName
  const infoValue = document.getElementById('infoValue')
  infoValue.textContent = keyName;
  // document.getElementById("infoValue").textContent = 
  //   sessionStorage.getItem(keys[keys.selectedIndex].textContent);

  // esto funciona tanto con sessionStorage como con localStorage, recordar que con el primero, los dato se pierden cuando se cierra 
  // la sesión, mientras que con el 2do los datos quedan almacenados.

})

// si colocamos sessionStorage.clear() => lo que hace es borrar nuestros datos
// podemos utlizar sessionStorage.removeItem() y entre los () tenemos que pasarle la key de lo que queremos borrar

// DRAG AND DROP
// Aquí entran en juego 2 opciones, el elemento que vamos a arrastar y luego tenemos el elemento donde vamos a soltar el anterior
// El eventro ARRASTRAR tiene 3 pequeños eventos:
//  dragstart (se dispara al comenzar a arrastrar)
//  drag (se dispara mientras arrastramos)
// dragend (se dispara cuando soltamos el objeto)

const gcLogo = document.querySelector('#gc-logo');
const dropZone = document.querySelector('#drop-zone');

// gcLogo.addEventListener('dragstart', () => {
//   console.log('Cuando te arrastra guachin')
// })
// gcLogo.addEventListener('drag', () => {
//   console.log('mientras te arrastra guachin')
// })
gcLogo.addEventListener('dragend', () => {
  console.log('cuando deja de arrastrarte guachin')
})

// No podemos soltar el elemento donde querramos, para ello tenemos que crear una zona de destino. En ella tendremos ciertos eventos
// los cuales le van a indicar qué tiene que hacer al soltarlos.
// dragenter (cuando el objeto entra en la zona)
// dragover (cuando el objeto se mueve sobre la zona de destino)
// drop (el objeto se suelta en la zona de destino)
// dragleave (when the element leaves the destination zone)
// dropZone.addEventListener('dragenter', () => {
//   console.log('drag ENTER')
// })
dropZone.addEventListener('dragover', () => {
  console.log('drag OVER')
})

// con el DROP tenemos un caso especial en el cual primero tenemos que usar el dragover, pero a su vez tenemos que capturar el evento 
// y utilizar el e.preventDefault =>
// dropZone.addEventListener('dragover', (e) => {
//   e.preventDefault()
//   console.log('drag OVER')
// })
// // para drop también tenemos que usar el e.preventdeafault()
// dropZone.addEventListener("drop", (e) => {
//   e.preventDefault()
//   console.log("Drop");
// });

// dragLeave es cuando salimos del la zona sin soltar el elemento
dropZone.addEventListener('dragleave', () => {
  console.log('Dejaste la zona guachin')
})