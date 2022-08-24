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

// EXERCISE DRAG AND DROP
// es importante ponerle en HTML el atributo draggable="true", con el fin de indicar que ese elemento es arrastrable.
// const pendingTasks = document.getElementById('pending-tasks');
// const finishedTasks = document.getElementById('finished-tasks');

// si usamos firefox tenemos que usar el objeto dataTransfer, ya que contiene toda la información del objeto que estamos arrastrando.
    // tenemos que usar:
      // setData: que establece la información que queremos compartir
      // getData: es la información que queremos obtener


// pendingTasks.addEventListener('dragstart', (e) => {
//   e.dataTransfer.setData('text', e.target.id)
//   console.log(e.dataTransfer.getData('text'))
  
// })

// pendingTasks.addEventListener('drag', (e) => {
//   e.target.classList.add('active')
// })

// pendingTasks.addEventListener('dragend', (e) => {
//   e.target.classList.remove('active')
// })

// esto lo tenemos que hacer de lo contrario no podremos arrastrar nuestros elementos al nuevo lugar
// finishedTasks.addEventListener('dragover', (e) => {
//   e.preventDefault()
// })

// función para cuando dropeamos el elemento
// finishedTasks.addEventListener('drop', (e) => {
//   e.preventDefault()
//   // tenemos que guardarlo en un elemento para pasarle todas las propiedades anteriores.
//   const element = document.getElementById(e.dataTransfer.getData('text'))
//   console.log(element)
//   element.classList.remove('active')
//   finishedTasks.appendChild(pendingTasks.removeChild(element))
// })

// Vamos con la inversa
// finishedTasks.addEventListener('dragstart', (e) => {
//   e.dataTransfer.setData('text', e.target.id)
// })

// finishedTasks.addEventListener('drag', (e) => {
//   e.target.classList.add('active')
// })

// finishedTasks.addEventListener('dragend', (e) => {
//   e.target.classList.remove('active')
// })

// pendingTasks.addEventListener('dragover', (e) => {
//   e.preventDefault()
// })

// pendingTasks.addEventListener('drop', (e) => {
//   e.preventDefault()
//   const element = document.getElementById(e.dataTransfer.getData('text'))
//   element.classList.remove('active')
//   pendingTasks.append(finishedTasks.removeChild(element))
// })

// DRAG AND DROP on ANY POSITION
const pendingTasks = document.getElementById('pending-tasks')
const finishedTasks = document.getElementById('finished-tasks')

// Control the EVENT
pendingTasks.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', e.target.id)
})

pendingTasks.addEventListener('drag', (e) => {
  e.target.classList.add('active')
})

pendingTasks.addEventListener('dragend', (e) => {
  e.target.classList.remove('active')
})

finishedTasks.addEventListener('dragover', (e) => {
  e.preventDefault()
})

finishedTasks.addEventListener('drop', (e) => {
  e.preventDefault()
  let clone = document.getElementById(e.dataTransfer.getData("text"));
  
  clone.classList.remove('active')

  const dropElementY = e.y

  const allTasks = finishedTasks.querySelectorAll('.task')
  console.log(allTasks)

  if(allTasks.length >= 1) {
    for(let i = 0; i < allTasks.length; i++) {
      // Top element
      const allTasksY1 =
        allTasks[i].getBoundingClientRect().y +
        allTasks[i].getBoundingClientRect().height / 2;

      // table height
      const allTasksY2 =
        allTasks[i].getBoundingClientRect().y +
        allTasks[i].getBoundingClientRect().height;

      // Checks if dropElementY is smaller than allTaksY1
      if(dropElementY <= allTasksY1) {
        allTasks[i].parentNode.insertBefore(clone, allTasks[i]);
        break;
      }
      if(dropElementY <= allTasksY2) {
        allTasks[i].parentNode.insertBefore(clone, allTasks[i].nextSibling);
        break;
      }

      finishedTasks.append(pendingTasks.removeChild(clone))
    }

  }else{

    finishedTasks.append(pendingTasks.removeChild(clone))
  }
})

// DRAG AND DROP SAME COLUMN
const simpleTasks = document.querySelectorAll('.simple-column .task')
const draggableColumn = document.querySelector('.simple-column')


simpleTasks.forEach(drag => 
  drag.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id)
    // console.log(e.target)
  })
)

draggableColumn.addEventListener('drag', (e) => {
  e.target.classList.add('active')
})

draggableColumn-addEventListener('dragend', (e) => {
  e.target.classList.remove('active')
})

draggableColumn.addEventListener('dragover', (e) => {
  e.preventDefault()
})

draggableColumn.addEventListener('drop', (e) => {
  e.preventDefault()
  const moveTask = document.getElementById(e.dataTransfer.getData('text'))
  console.log(moveTask)
  moveTask.classList.remove('active')

  const newList = draggableColumn.querySelectorAll('.task')
  const elementY = e.y

  if(newList.length >= 1) {

    for(let i = 0; i < newList.length; i++) {
      const taskY =
        newList[i].getBoundingClientRect().y +
        newList[i].getBoundingClientRect().height / 2;

      const taskX =
        newList[i].getBoundingClientRect().y +
        newList[i].getBoundingClientRect().height;

      if(elementY <= taskY) {
        newList[i].parentNode.insertBefore(moveTask, newList[i]);
        break
      }
      if(elementY <= taskX) {
        newList[i].parentNode.insertBefore(moveTask, newList[i].nextSibling);
        break;
      }
  
      draggableColumn.append(moveTask)
    }
    
  }else{

    draggableColumn.append(moveTask)

  }

})

// DRAG AND DROP API FILE
const fileInput = document.getElementById('file');
const imagen = document.getElementById('img');

// https://developer.mozilla.org/es/docs/Web/API/FileReader la documentación
// el FileReader.readAsDataURL es el común más utilizado

// Esto aplica para leer textos
const textDoc = document.getElementById('text')
// 'change' es el evento que nos permite saber si algo cambió
/* fileInput.addEventListener('change', (e) => {
  // console.log(e.target.files) Recordar que nos crea un array y por ello tenemos que indicarle el index
  // tenemos que crear variables para acceder al contenido del archivo que subimos. 
  const file = e.target.files[0]
  // console.log(file)
  // tenemos que usar FileReader para tener acceso a todos los métodos y propiedades del FileReader
  const fileReader = new FileReader()
  // console.log(fileReader)
  fileReader.readAsText(file) // si lo dejamos así no hace nada, ya que el proceso es asincrónico. Leemos un archivo como texto.
  // le tenemos que poner un evento para saber cuando logró leerlo por completo.
  fileReader.addEventListener('load', (e) => {
    console.log(e.target.result) // accedemos al contenido del texto. Eso luego lo podemos añadir al <p></p> que hemos creado =>
    textDoc.textContent = e.target.result
  })

}) */

// Ahora el turno de las imágenes, así cargamos una sola imagen
/* fileInput.addEventListener('change', (e) => {
  const img = e.target.files[0]
  const fileReader = new FileReader()
  fileReader.readAsDataURL(img)
  fileReader.addEventListener('load', (e) => {
    // tenemos que agregarle el src de la imagen, indicarle de dónde viene
    imagen.setAttribute('src', e.target.result)
    // suele utilizarse para saber que subimos al servidor
  })
}) */


// Si queremos permitir la carga de más de una imagen.
fileInput.addEventListener('change', (e) => {
  const img = e.target.files[0]
  const fileReader = new FileReader()
  fileReader.readAsDataURL(img)
  fileReader.addEventListener('load', (e) => {
    // tenemos que agregarle el src de la imagen, indicarle de dónde viene
    imagen.setAttribute('src', e.target.result)
    // suele utilizarse para saber que subimos al servidor
  })
})