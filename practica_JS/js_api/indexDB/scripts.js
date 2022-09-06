// Tenemos que crear una constante para acceder y almacenar en indexedDB. Recordar que indexedDB desciende del objeto window
// por lo tanto tenemos que poner window.indexedDB, de lo contrario nos dará fallo. Si lo llamamos idb, no tenemos que poner window
// esto sucede porque la constante donde lo guardamos se llama igual.
const indexedDB = window.indexedDB
const form = document.getElementById('form');
const tasks = document.getElementById('tasks');

// lo primero es preguntar si existe indexedDB, creamos una variable en la que vamos a almacenar los datos
if(indexedDB && form) {
  let db;
  // para acceder a la base de datos utilizamos el siguiente comando, recibe 2 parámetros, el nombre y el otro podemos poner version
  // los números tienen que ser siempre enteros, si creamos distintas versiones, crea distintas bases de datos
  const request = indexedDB.open("taskslist", 1);
  // luego tenemos que usar los métodos asincronos de la API indexedDB. Solo se utiliza cuando se accede por 1ra vez
  request.onsuccess = () => {
    db = request.result;
    console.log("OPEN", db);
    readData()
  };

  // este metodo se ejecuta antes, ya que pregunta si está creada. Si está creada, solamente ejecuta open.
  // para ello tendremos que crear una variable, le tendremos que dar nombre
  // se pueden crear varios almacenes siempre que los llamemos de forma distinta, no hay límite.
  request.onupgradeneeded = () => {
    db = request.result;
    console.log("Create", db);
    const objectStore = db.createObjectStore("tasks", {
      autoIncrement: true,
      // es importante tratar de usar números únicos, como el dni de una persona. El titulo una tarea tmb puede ser. Otro que se puede
      // usar es keyPath: 'taskTitle'
    });
  };

  request.onerror = (error) => {
    console.log("Error", error); // error lo pasamos como parámetro en el caso de que haya un error
  };

  // creamos una función para agregar los datos, y el parámetro que vamos a pasar será data. Se hace en 3 pasos y tmb trabajamos con
  // parámetros, en el 1er paso transaction van 2: 1ro el almacén de datos 'tasks' y el 2do es el modo de la transacción:
  // readonly, solamente para leer y readwrite para escribir datos. Si no ponemos nada por defecto es readonly
  const addData = (data) => {
    const transaction = db.transaction(["tasks"], "readwrite");
    // Ahora que tenemos la transacción creada, tenemos que abrir el almacén de datos, que se encuentra en transaction y usamos objectStore
    // que recibe como parámetro el almacén con el cual vamos a trabajar que es 'tasks'
    const objectStore = transaction.objectStore("tasks");
    // luego de hecho esto le tenemos que indicar que añada los datos. add() y los parámetros son los que llegan por data
    const request = objectStore.add(data);
    // Si da error es porque no se le están asignando las keys correspondientes. Se necesita de una clave. Con autoIncrement: true
    // colocandolo en el create, le indicamos al programa que cree la key por si mismo. Tener en cuenta que si ya tenemos creado el
    // almacén de datos, nos dará nuevamente error. Podemos eliminar el anterior

    // Para que al momento de agregar una tarea nueva se agregue a nuestra lista, para ello tenemos que llamar a nuestra función readData()
    // veremos que se nos rellena con todas las tareas. Para ello antes de añadir el fragment le vamos a indicar que elimine en 'tasks'
    readData()
  };

  // Para leer los datos tenemos que hacer algo muy parecido a cuando los agregamos
  const readData = () => {
    // tmb necesita de una transaccion, pero no tiene que ser de lectura o escritura, será 'readonly', es el valor x defecto, si lo
    // olvidamos no sucede nada
    const transaction = db.transaction(["tasks"], "readonly");
    const objectStore = transaction.objectStore("tasks");
    // en el request, ya no es necesario el parámetro de 'data' y el 'add', pero si vamos a necesitar un cursor, que recorre cada uno
    // de los objetos y nos devuelve ese valor, el método es openCursor(). Lee registro a registro y si no le indicamos nada, solamente
    // leerá uno
    const fragment = document.createDocumentFragment() // conviene ponerlo por encima del onsuccess de lo contrario siempre estará vacio

    const request = objectStore.openCursor();
    // Conviene verificar todo fué de forma correcta y guardar el resultado en una constante. Aquí le indicamos de leer todo completo.
    request.onsuccess = (e) => {
      // e.target.result es el valor del cursor. Conviene tambien preguntar si aún está el cursor. Si no existe entonces significa
      // que ya terminó de leer los datos. Con 'cursor.continue' le indicamos que continue leyendo los datos.
      const cursor = e.target.result
      // con la lectura de los datos es donde puedo luego crear los elementos para agregar a la pantalla.

      if(cursor) {
        // console.log(cursor.value)
        // creo un elemento
        const taskTitle = document.createElement('P');
        taskTitle.classList.add('text')
        taskTitle.textContent = cursor.value.taskTitle;
        fragment.appendChild(taskTitle)
        // creo el otro elemento con el priority
        const taskPriority = document.createElement('P');
        taskPriority.classList.add('text')
        taskPriority.textContent = cursor.value.taskPriority;
        fragment.appendChild(taskPriority)
        // como esto es un bucle, podemos crear un fragment para agilizar la tarea
        cursor.continue()
      }else{
        // lo colocamos para que nos indique que ya leyó hasta el último registro. Esto nos sirve para luego indicarque que el no haber
        // más registros, entonces en ese momento añada nuestro fragment
        console.log('No more data to read')
        // eliminamos el textContent para evitar tener duplicados con el addData()
        tasks.textContent = ''
        // agregamos el fragment
        tasks.appendChild(fragment)
      }
    }
    // readData(), tenemos que colocarlo luego de que la misma ya se abrió, eso es en OPEN
  };

  // Cuando vemos que abrió la base y está todo correcto, lo siguiente es crear el almacen de datos, todas las funciones se realizan
  // en el método onepgradeneeded, recordemos que estaremos actualizando y modificando la misma
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // creamos el objeto para enviar a la base de datos, con task y priority accedemos al input y el select
    const data = {
      taskTitle: e.target.task.value,
      taskPriority: e.target.priority.value,
    };
    console.log(data.taskTitle, data.taskPriority);
    console.log(data);
    addData(data);
    
  });
}

// Para leer los datos tenemos que hacer algo muy parecido a cuando los agregamos
const readData = (data) => {
  const transaction = db.transaction(['tasks'], 'readwrite')
  const objectStore = transaction.objectStore('tasks')
  const request = objectStore.add(data)
}