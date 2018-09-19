
const coindesk = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical'
})

let startDate = '2018-01-01';
let endDate = '2018-31-01';
let currency = 'EUR'

 coindesk.get(`close.json`)
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.log(err)
  })
