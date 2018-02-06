const baseURL = 'http://api.coindesk.com/v1/bpi/historical/close.json';

document.getElementById("coinButton").onclick = function(){
    axios.get(baseURL)
    .then(response => {
      console.log(response.data)
    })
    .catch(err => {
      console.error(err)
    })
}


