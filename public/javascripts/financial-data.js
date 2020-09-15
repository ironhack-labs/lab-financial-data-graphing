const url = `http://api.coindesk.com/v1/bpi/historical/close.json`

axios.get(url)
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })