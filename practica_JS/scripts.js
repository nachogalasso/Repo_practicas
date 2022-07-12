const listItem = document.querySelectorAll("li.item");
const dates = document.querySelectorAll("p.text");

const para = document.createElement("p");
const node = document.createTextNode("Hola guachin");
para.appendChild(node)
const elem = document.querySelector(".new")
elem.appendChild(para)

console.log(listItem)
console.log(dates)
console.log(node, para);

function myFunction() {
  // let i = 0
  for(i=0;i<listItem.length;i++) {
    listItem[0].innerHTML = "House";
    listItem[1].innerHTML = "Car";
    listItem[2].innerHTML = "Dog";
  }
}

myFunction()


// dates.addEventListener("click", colorRed)

// function colorRed() {
//   for (i = 0; i < dates.length; i++) {
//     dates[i].style.color = "red";
//     dates[i].innerHTML = "Puto párrafo"
//   }
// }


const rat = document.querySelector('.rat');


rat.addEventListener('click' , () => {
  rat.innerHTML = "hola"
})

const demoApi = document.getElementById("demo");

function getLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  }else{
    demoApi.innerHTML = "Geolocation, no es soportadada por este navegador"
  }
}

function showPosition(position) {
  demoApi.innerHTML = "Latitude: " + position.coords.latitude + "<br> Longitude: " + position.coords.longitude
}

demoApi.addEventListener('click', getLocation)

const pizza = document.getElementById("btn");

function confirmNum() {
  let text;
  if(document.getElementById("num").validity.rangeOverflow) {
    text = "Valor muy grande"
  }else{
    text = "INPUT OK";
  }
  document.getElementById("message").innerHTML = text;
}

pizza.addEventListener('click', confirmNum);

const storage = document.getElementById("storage")
localStorage.setItem("name", "john Doe") // se guardan los datos en el localStorage
localStorage.getItem("name") // mientras que con el getItem, traemos esos datos
// luego tenemos sessionStorage que solamente almacena por una sesion, los datos se borran cuando se cierra el navegador
// todos poseen propiedades

storage.innerHTML = localStorage.getItem("name")