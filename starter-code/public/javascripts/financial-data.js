let arrKeys = [] 
let arrValues = []

const getCoinData = (start, end) => {
    debugger
    axios({
      method: "get",
      url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}` 
    })
    .then(response => {
        debugger
    let data = response.data.bpi
    console.log(response.data.length);
    arrKeys = [] 
    arrValues = []
      for (i = 0; i < Object.keys(data).length; i++){
        arrKeys.push(Object.keys(data)[i]);
        arrValues.push(Object.values(data)[i]);
      }
      createCoinList(arrKeys, arrValues );
      createGraph();
    })
    .catch(err => {
      console.log(err);
    })
  }
  
const createCoinList = (keyArray, valArray) => {
    let htmlList = "";
    for(let i = 0 ; i < keyArray.length; i ++) {
        htmlList += `<li> ${keyArray[i]}: ${valArray[i]} </li>`
    }
    document.getElementById("ul").innerHTML = htmlList;
    debugger
}

const createGraph = () => {
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: arrKeys,
        datasets: [{
            label: 'historic price chart',
            data: arrValues,
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
}

getCoinData();

const button = document.getElementById("button");

button.onclick = () => {
    let start = document.getElementById("startdate").value;
    let end = document.getElementById("enddate").value;
    getCoinData(start, end);
};