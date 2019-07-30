const coindeskAPI = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

let from
let to

coindeskAPI.get("")
    .then(response => {
        // console.log(response)
        // console.log(response.data.bpi)
        // console.log(Object.keys(response.data.bpi))
        // console.log(Object.values(response.data.bpi))
        printCharts(Object.keys(response.data.bpi), Object.values(response.data.bpi))
    })
    .catch(err => console.log('error', err))

document.getElementById("from-input").onchange = function () {
    from = document.getElementById("from-input").value
    console.log(from)
}

document.getElementById("to-input").onchange = function () {
    to = document.getElementById("to-input").value
    console.log(to)

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}`)
        .then(response => {
            console.log(response)
            console.log(response.data.bpi)
            console.log(Object.keys(response.data.bpi))
            console.log(Object.values(response.data.bpi))
            printCharts(Object.keys(response.data.bpi), Object.values(response.data.bpi))
        })
        .catch(err => console.log('error', err))

}


const currency = document.getElementById("currency-input").values



const printCharts = (infokeys, infovalues) => {
    showBarChart('q1', infokeys, infovalues)
}





// const fecha = "2019-09-12"

// const urlfalsa= `?fecha=${fecha}`

const showBarChart = (id, infokeys, infovalues) => {
    new Chart(id, {
        type: 'bar',
        data: {
            labels: infokeys,
            datasets: [{
                label: 'Bitcoin Price Index',
                data: infovalues,
                borderColor: 'rgba(0, 50, 250, .7)',
                backgroundColor: 'rgba(0, 250, 50, .2)',
                borderWidth: 1
            }]
        }
    })
}






// FUNICONA NO BORRAR

// const showBarChart = (id, infokeys, infovalues) => {
//     new Chart(id, {
//         type: 'bar',
//         data: {
//             labels: infokeys,
//             datasets: [{
//                 label: 'Bitcoin Price Index',
//                 data: infovalues,
//                 borderColor: 'rgba(0, 50, 250, .7)',
//                 backgroundColor: 'rgba(0, 250, 50, .2)',
//                 borderWidth: 1
//             }]
//         }
//     })
// }