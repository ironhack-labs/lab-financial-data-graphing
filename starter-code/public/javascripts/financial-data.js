const bitcoinAPI = axios.create({
  baseURL: 'https://api.coindesk.com/v1/bpi/historical/close.json'
})

console.log(bitcoinAPI)
const getClosePrices = ()=>{
  console.log('entro en getClosePrices')
  bitcoinAPI.get()
  .then(results => {
    console.log(results.data.bpi)

  })
  .catch(err=>console.log(err))
}

getClosePrices()