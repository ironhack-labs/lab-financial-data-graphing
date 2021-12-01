
axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
.then(res => {
    var data = res;
})
.catch(error => console.error(error))
