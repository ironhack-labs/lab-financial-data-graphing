//list variables here

const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json'
axios
    .get(apiUrl)
    .then(responseFromAPI => {
        console.log(responseFromAPI)
    })
    .catch(err => ('Error occurred while getting the data: ', err));