// Tenemos que crear una constante para acceder y almacenar en indexedDB. Recordar que indexedDB desciende del objeto window
// por lo tanto tenemos que poner window.indexedDB, de lo contrario nos dará fallo. Si lo llamamos idb, no tenemos que poner window
// esto sucede porque la constante donde lo guardamos se llama igual.
const indexedDB = window.indexedDB
const form = document.getElementById('form');

// lo primero es preguntar si existe indexedDB, creamos una variable en la que vamos a almacenar los datos
if(indexedDB && form) {
  let db
  // para acceder a la base de datos utilizamos el siguiente comando, recibe 2 parámetros, el nombre y el otro podemos poner version
  // los números tienen que ser siempre enteros, si creamos distintas versiones, crea distintas bases de datos
  const request = indexedDB.open('taskslist', 1)
  // luego tenemos que usar los métodos asincronos de la API indexedDB. Solo se utiliza cuando se accede por 1ra vez
  request.onsuccess = () => {
    db = request.result
    console.log('OPEN', db)
  }

  // este metodo se ejecuta antes, ya que pregunta si está creada. Si está creada, solamente ejecuta open.
  // para ello tendremos que crear una variable, le tendremos que dar nombre
  // se pueden crear varios almacenes siempre que los llamemos de forma distinta, no hay límite.
  request.onupgradeneeded = () => {
    db = request.result;
    console.log("Create", db);
    const objectStore = db.createObjectStore('tasks', {
      autoIncrement: true
      // es importante tratar de usar números únicos, como el dni de una persona. El titulo una tarea tmb puede ser. Otro que se puede
      // usar es keyPath: 'taskTitle'
    })
  }

  request.onerror = (error) => {
    console.log('Error', error) // error lo pasamos como parámetro en el caso de que haya un error
  }

  // creamos una función para agregar los datos, y el parámetro que vamos a pasar será data. Se hace en 3 pasos y tmb trabajamos con
  // parámetros, en el 1er paso transaction van 2: 1ro el almacén de datos 'tasks' y el 2do es el modo de la transacción: 
  // readonly, solamente para leer y readwrite para escribir datos. Si no ponemos nada por defecto es readonly
  const addData = (data) => {
    const transaction = db.transaction(['tasks'], 'readwrite')
    // Ahora que tenemos la transacción creada, tenemos que abrir el almacén de datos, que se encuentra en transaction y usamos objectStore
    // que recibe como parámetro el almacén con el cual vamos a trabajar que es 'tasks'
    const objectStore = transaction.objectStore('tasks')
    // luego de hecho esto le tenemos que indicar que añada los datos. add() y los parámetros son los que llegan por data
    const request = objectStore.add(data)
    // Si da error es porque no se le están asignando las keys correspondientes. Se necesita de una clave. Con autoIncrement: true
    // colocandolo en el create, le indicamos al programa que cree la key por si mismo. Tener en cuenta que si ya tenemos creado el
    // almacén de datos, nos dará nuevamente error. Podemos eliminar el anterior  
  }

  // Cuando vemos que abrió la base y está todo correcto, lo siguiente es crear el almacen de datos, todas las funciones se realizan
  // en el método onepgradeneeded, recordemos que estaremos actualizando y modificando la misma
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    // creamos el objeto para enviar a la base de datos, con task y priority accedemos al input y el select
    const data = {
      taskTitle:e.target.task.value,
      taskPriority:e.target.priority.value
    }
    console.log(data.taskTitle, data.taskPriority)
    console.log(data)
    addData(data)
  })
}