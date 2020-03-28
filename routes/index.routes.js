const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.render('index', { title: 'Express' }));

// axios({
//     method: "The HTTP method (verb) we are going to use, e.g. GET, POST, PUT, etc.",
//     url: "The url the server is going to receive.",
//     params: "URL parameters to be sent with the request"
//   })
//     .then(response => {
//       // Here we can do something with the response object
//     })
//     .catch(err => {
//       // Here we catch the error and display it
//     });

module.exports = router;
