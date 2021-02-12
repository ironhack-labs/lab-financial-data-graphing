const apiUrl = "http://api.coindesk.com/v1/bpi/historical/close.json"



// get

axios.get(apiUrl)
    .then((data) => {
        console.log(data)
    })
    .catch((e) => console.log("Error geting data", e))