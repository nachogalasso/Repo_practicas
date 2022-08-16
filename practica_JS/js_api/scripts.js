const form = document.getElementById('form')
const keys = document.getElementById('keys')

// entender que sessionStorage funciona hasta que se cierra el navegador, siempre nos pide una KEY y un VALUE,ambos serán strings
// SIEMPRE TIENE QUE HABER UNA 'KEY' Y UN 'VALUE', el value puede ser un objeto JS
// mientras que localStorage almacena en el ordenador local

form.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(e)

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

  // podemos agregar los campos al select
  keys.innerHTML += `<option>${form.key.value}</option>`

  form.reset()
})
