

const getCosas = () => {
 return axios
  .get(`http://api.coindesk.com/v1/bpi/historical/close.json`)
  .then(res =>  {
      return res.data.bpi 
      
  }).catch(e => console.log(e));
}

let myObject = getCosas();
let stockLabels = [];
let stockPrice = []

Object.keys(myObject).map(function(key, index) {
    stockPrice.push(myObject[key]);
    stockLabels.push(key);
    console.log("!!!");
 });
 console.log(stockLabels);
 console.log(stockPrice);
 console.log(myObject);

let printTheChart = ((stockData) => {
    let stockLabels = stockData.map( element => element.date);
    let stockPrice = stockData.map( element => element.close);
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: stockLabels,
        datasets: [{
          label: "Stock Chart",
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: stockPrice,
        }]
      }
    });
  });

/* const stockInfo  = axios.create({
    baseURL: 'https://api.iextrading.com/1.0/stock/',
  });
  
  let stockTicket = "amzn";
  
  stockInfo.get(`${stockTicket}/chart`)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
  }); */

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});