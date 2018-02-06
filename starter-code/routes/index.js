var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Ajax PP' })
})

// const coinDesk = axios.create({
//   baseURL: 'http://pokeapi.co/api/v2/pokemon'
// })

// function getPokemonInfo(id) {
// axios.get(id)
// .then(response => {
//   console.log(response.data)
// })
// .catch(err => {
//   console.error(err)
// })
// }

// document.getElementById("pokeButton").onclick = function(){
// getPokemonInfo(1);
// }

module.exports = router
