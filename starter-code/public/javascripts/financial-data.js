const ctx = document.getElementById("myChart").getContext('2d');
let data;
let fromData = "2018-01-06";
let toData = "2018-02-05";



// axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
// .then(response => {
//   console.log(response.data.bpi)
//   let dataData = Object.values(response.data.bpi)
//   let labelsData = Object.keys(response.data.bpi)
//   let myLineChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       datasets: [{
//           label: 'Bitcoins Value',
//           data: dataData
//       }],
//       labels: labelsData
//     },
//   });
// }).catch(e => console.log(e))

document.getElementById("from").addEventListener('input', function (evt) {
  fromData = document.getElementById("from").value;
  filterChart()
});
document.getElementById("to").addEventListener('input', function (evt) {
  fromData = document.getElementById("to").value;
  filterChart()
});



function filterChart(){
  axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromData}&end=${toData}`)
  .then(response => {
    console.log(response.data.bpi)
    let dataData = Object.values(response.data.bpi)
    let labelsData = Object.keys(response.data.bpi)
    let myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
            label: 'Bitcoins Value',
            data: dataData
        }],
        labels: labelsData
      },
    });
  }).catch(e => console.log(e))
}
filterChart()