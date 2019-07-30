// const coindeskApi = axios.create({

//     baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
// })
const getPrice = () => {

// let query = "coindeskApi?currency=<VALUE></VALUE>"

let from = document.getElementById('from').value
let to = document.getElementById('to').value
console.log(from, to)

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json&start=${from}&end=${to}`)
        .then(response => console.log(response.data.bpi))
        .catch(err => console.log('error', err))
}

getPrice()


// document.getElementById('from').onchange = () => {
//     console.log(document.getElementById('from').value)
// }    

//     document.getElementById('to').onchange = () => {
//         console.log(document.getElementById('to').value)
//}