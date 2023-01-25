let currentPage = 0
let totalPages = null

async function get_characters(page) {
  // Enviar petición Get
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  )

  if (response.ok) {
    // Obtener datos
    const data = await response.json()
    // get total of pages
    totalPages = data.info.pages
    //return cahracters info
    return data.results
  } else {
    console.log('error in getting characters')
    return null
  }
}

const handlePrevPage = async () => {
  currentPage--
  if (currentPage <= 0) {
    return
  }
  const characters = await get_characters(currentPage)
  show_characters(characters)
}

const handleNextPage = async () => {
  currentPage++
  if (currentPage >= totalPages) {
    return
  }
  const characters = await get_characters(currentPage)
  show_characters(characters)
}

function show_characters(characters) {
  let cards = ''
  // Iterar arreglo
  for (let i = 0; i < characters.length; i++) {
    var elemento = document.getElementsByClassName('status')
    cards += `
    <article class="card">
      <img src="${characters[i].image}" />
      <div class="body-card">
        <h2>${characters[i].name}</h2>
        <div>
          <span id="status" class="status">${characters[i].status}</span>
          <span> - ${characters[i].species}</span>
        </div>
        <label>Actual location</label>
        <span>${characters[i].location.name}</span>
        <label>Actual location</label>
        <span>${characters[i].gender}</span>
        <label>Actual location</label>
        <span>${characters[i].origin.name}</span>
      </div>
    </article>
    `
  }
  document.getElementById('section-cards').innerHTML = cards
  for (var i = 0; i < characters.length; i++) {
    if (characters[i].status == 'Alive') elemento[i].className += ' alive'
    if (characters[i].status == 'Dead') elemento[i].className += ' dead'
    if (characters[i].status == 'unknown') elemento[i].className += ' unknown'
  }
}

async function main() {
  const characters = await get_characters(currentPage)
  show_characters(characters)
}

main()

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("prev").addEventListener("click", handlePrevPage);
  document.getElementById("next").addEventListener("click", handleNextPage);
})
