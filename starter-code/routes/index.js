var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index')
});


// axios.get('https://rickandmortyapi.com/api/character/')
//   .then(response => response.data.results.map(
//   char => console.log(char.name)))

//   axios.get('https://rickandmortyapi.com/api/character/')
//   .then(response => response.data.results.map(
//     char => console.log(char => {
//       const domName = document.createElement('p')
//       domName.innerHTML = char.name
//     }
// )))

// axios.get('https://rickandmortyapi.com/api/character/')
//   .then(response => response.data.results.map(
//     char => console.log(({name, image}) => {
//       const domName = document.createElement('p')
//       domName.innerHTML = name
//       const domImage = document.createElement('img')
//       domImage.src = image
//       const body = document.querySelector('body')
//       body.appendChild(domName)
//       body.appendChild(domImage)
//     }
// )))
// //srcipt in public javascripts
// <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

// //where?
// axios.get('https://rickandmortyapi.com/api/character/')
//   .then(response => response.data.results
//         .map(({name, image}) => {
//       var domName = document.createElement('p')
//       domName.innerHTML = name
//       var domImage = document.createElement('img')
//       domImage.src = image
//       var body = document.querySelector('body')
//       body.appendChild(domName)
//       body.appendChild(domImage)
//     }
// ))

module.exports = router;
