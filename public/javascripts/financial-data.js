const apiUrl = `https://api.coindesk.com/v1/bpi/currentprice.json`
//const currencyUrl = `https://api.coindesk.com/v1/bpi/currentprice/<CODE>.json`

axios.get(apiUrl)
    .then(responseFromAPI => {
        console.log('responseFromAPI: ', responseFromAPI);
    })
    .catch(err => console.log('Error while getting the data: ', err))