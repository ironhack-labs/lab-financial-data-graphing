const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`

//GET data from API
axios
    .get(apiUrl)
    .then((response) => {
        //console.log(response.data.bpi)
        const data = response.data.bpi
        const xAxis = Object.keys(data)
        //console.log(xAxis)
        const yAxis = Object.values(data)
        //console.log(yAxis)
    })
    .catch((e)=> console.log(e))