const baseURL =  'http://api.coindesk.com/v1/bpi/historical/close.json'


function getCoinInfo() {
  axios.get(baseURL)
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.error(err)
  })
}

document.getElementById("coinButton").onclick = function(){
  getCoinInfo(0);
}