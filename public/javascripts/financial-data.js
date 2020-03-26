axios.get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(results => {
        console.log(results.data)
    })
    .catch(err => console.log("Error while getting the data: ", err));