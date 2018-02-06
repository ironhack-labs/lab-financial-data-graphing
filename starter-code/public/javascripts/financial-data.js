const coinDeskApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})
  
function getCoindeskData(id) {
    coinDeskApi.get(id)
    .then(response => {
        console.log(response.data)
    })
    .catch(err => {
        console.error(err)
    })
}

document.getElementById("coindesk-button").onclick = function(){
    getCoindeskData('');
}