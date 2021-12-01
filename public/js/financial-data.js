axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
.then(responseFromApi => console.log(responseFromApi))
.catch(error => console.error(error))



