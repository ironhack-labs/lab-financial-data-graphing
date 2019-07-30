// const coindeskApi = axios.create({

//     baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
// })
const getPrice = () => {

// let query = "coindeskApi?currency=<VALUE></VALUE>"

let from = document.getElementById('from').value
let to = document.getElementById('to').value
console.log(from, to)

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json&start=${from}&end=${to}`)
        .then(response => {
            printTheChart(response.data.bpi);

            console.log(response.data.bpi)

        })
        .catch(err => console.log('error', err))
}

getPrice()

// date.get(`${from, to}/chart`)
//     .then(response => {
//     })
//     .catch( error => {
//       console.log(error);
//   });

const printTheChart = (data => {
  const date = Object.keys(data);
  const bitcoin = Object.values(data);
  console.log(date)
  const ctx = document.getElementById('canvas').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: date,
      datasets: [{
        label: "chart",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: bitcoin, 
      }]
    }
  });
});


// document.getElementById('from').onchange = () => {
//     console.log(document.getElementById('from').value)
// }    

//     document.getElementById('to').onchange = () => {
//         console.log(document.getElementById('to').value)
//}