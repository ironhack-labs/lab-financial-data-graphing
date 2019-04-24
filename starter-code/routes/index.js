var express = require('express');
var router = express.Router();
const Axios = require('axios')

router.get('/', (req, res, next) => res.render('index'))

axios.get('/user', {
  params: {
    ID: 12345
  }
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});


module.exports = router;
