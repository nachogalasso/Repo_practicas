const filesInput = document.getElementById('something')
const dZone = document.getElementById('zone-drop')

// lo que vamos a hacer es lograr que al darle click al recuadro se abra la opcion de insertar archivo, como con el input
// le adjuntamos una function y con eso finjimos que hicimos click en la dZone
dZone.addEventListener('click', () => {
  // luego al input lo tenemos que ocultar, para que no confunda.
  filesInput.classList.add('hide')
  filesInput.click()
})

// usamos el 'dragover' para similar el hover
dZone.addEventListener('dragover', (e) => {
  e.preventDefault()
  dZone.classList.add('zone-drop--active')
})
// cuando el usuario retira el archivo de la zona
dZone.addEventListener('dragleave', (e) => {
  e.preventDefault()
  dZone.classList.remove('zone-drop--active')
})
// cuando el usuario ya cargó el archivo
dZone.addEventListener('drop', (e) => {
  e.preventDefault()
  filesInput.files = e.dataTransfer.files
  console.log(filesInput.files)
})

filesInput.addEventListener('change', (e) => {
  console.log(filesInput.files)
})