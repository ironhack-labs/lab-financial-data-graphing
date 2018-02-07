// index.js

const pokeApi = axios.create({
    baseURL: 'http://pokeapi.co/api/v2/pokemon'
})

function getPokemonInfo(id) {
  axios.get(id)
  .then(response => {
    console.log(response.data)
  })
}

document.getElementById("pokeButton").onclick = function(){
  getPokemonInfo(1);
}