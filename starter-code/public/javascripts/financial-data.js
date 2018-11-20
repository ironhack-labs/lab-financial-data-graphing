window.onload = function(){
  document.getElementById('getAPIData').onclick = function(){
    axios.get("http://api.coindesk.com/v1/bpi/historical/close.json?start=2018-10-20&end=2018-11-19")
    .then(response => {
      //console.log(response.data.bpi);
  })
    .catch(errGetAPI =>{
      console.log(errGetAPI)
    })
  }

}