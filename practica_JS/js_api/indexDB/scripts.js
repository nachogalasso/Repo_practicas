// Tenemos que crear una constante para acceder y almacenar en indexedDB. Recordar que indexedDB desciende del objeto window
// por lo tanto tenemos que poner window.indexedDB, de lo contrario nos dará fallo. Si lo llamamos idb, no tenemos que poner window
// esto sucede porque la constante donde lo guardamos se llama igual.
const indexedDB = window.indexedDB

// lo primero es preguntar si existe indexedDB, creamos una variable en la que vamos a almacenar los datos
if(indexedDB) {
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
    const objectStore = db.createObjectStore('tasks')
  }

  request.onerror = (error) => {
    console.log('Error', error) // error lo pasamos como parámetro en el caso de que haya un error
  }

  // Cuando vemos que abrió la base y está todo correcto, lo siguiente es crear el almacen de datos, todas las funciones se realizan
  // en el método onepgradeneeded, recordemos que estaremos actualizando y modificando la misma
}