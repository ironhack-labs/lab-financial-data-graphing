
const getCoinData = (start, end) => {
    axios({
      method: "get",
      url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}` 
    })
    .then(response => {
    let data = response.data.bpi;
    let coinArray = [] ;
      for (i = 0; i < Object.entries(data).length; i++){
        coinArray.push(Object.entries(data)[i]);
      }
      createCoinList(coinArray);
      createGraph(data);
    })
    .catch(err => console.log(err))
  };
  
const createCoinList = (coinArray) => {
    let htmlList = "";
    coinArray.forEach(element => htmlList += `<li> ${element[0]}  :   ${element[1]}</li>`);
    document.getElementById("ul").innerHTML = htmlList;
}

const createGraph = (data) => {
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Object.keys(data),
        datasets: [{
            label: 'historic price chart',
            data: Object.values(data),
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
    }    
});
};

const button = document.getElementById("button");

button.onclick = () => {
    let start = document.getElementById("startdate").value;
    let end = document.getElementById("enddate").value;
    getCoinData(start, end);
};