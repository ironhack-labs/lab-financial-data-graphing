
const bitCoinAPI = axios.create({ 
    baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
})
console.log(baseURL)
bitCoinAPI.get(req.query)
