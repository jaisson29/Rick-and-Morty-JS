let page = 1
var url = 'https://rickandmortyapi.com/api/character?page='+page

// // document.getElementById('next').onclick = function(url, page){
// //   page = page +1
// //   console.log(page)
// //   return url = 'https://rickandmortyapi.com/api/character?page='+page
// // };
  

// alert(url)

async function get_characters(url_api) {
  // Enviar petición Get
  const resp = await fetch(url_api, {
    method: 'GET',
  })
  // Obtener datos
  const data = await resp.json()
  return data.results
}

function show_characters(characters) {
  let cards = ''
  // Iterar arreglo
  for (let i = 0; i < characters.length; i++) {
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
}

function checkStatus(character) {
  var elemento = document.getElementsByClassName('status')
  for (var i = 0; i < character.length; i++) {
    if (character[i].status == 'Alive') elemento[i].className += ' alive'
    if (character[i].status == 'Dead') elemento[i].className += ' dead'
    if (character[i].status == 'unknown') elemento[i].className += ' unknown'
  } 
}

async function main() {
  const characters = await get_characters(url)
  show_characters(characters)
  checkStatus(characters)
}

main()
