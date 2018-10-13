
//const axios = require("axios")

//Peticion axios
axios.get("http://api.coindesk.com/v1/bpi/historical/close.json?start=2018-08-01&end=2018-10-13")
.then(res =>{
  console.log(res.data.time.updated)
})