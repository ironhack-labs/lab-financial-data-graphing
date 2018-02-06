const coinDeskApi = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

function getData(id) {
  coinDeskApi.get(id)
  .then(response => {
    console.log(response.data)
  })
  .catch((err) => {
    console.error(err)
  })
}

document.getElementById("coin-data").onclick = function(){
  console.log(getData());
}
