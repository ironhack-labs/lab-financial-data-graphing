let api_url = "http://api.coindesk.com/v1/bpi/historical/close.json";


axios
.get(api_url)
.then(res => res.data.bpi)
.then(data => Object.entries(data))
.then(data =>  data.map(e => ({ date: e[0], close: e[1] })))
.then(closes => {
  drawChart(closes)
}); 


const drawChart = data => {
let stockLabels = data.map(e => e.date);
let stockPrice = data.map(e => e.close);

let ctx = document.getElementById("myChart").getContext("2d");
let chart = new Chart(ctx, {
  type: "line",
  data: {
    labels: stockLabels,
    datasets: [
      {
        label: "Stock Chart",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: stockPrice
      }
    ]
  }
});
};


function getDate (){
  let start = document.getElementById("start-date").value;
  let end = document.getElementById("end-date").value;

  if((start!=="" && end!=="" ) && (new Date(start).getTime() < new Date(end).getTime() )){
  console.log(start, end);
  
  api_url+=`?start=${start}&end=${end}`;
  console.log(api_url);

  axios
  .get(api_url)
  .then(res => res.data.bpi)
  .then(data => Object.entries(data))
  .then(data =>  data.map(e => ({ date: e[0], close: e[1] })))
  .then(closes => {
    console.log(closes)
    drawChart(closes)
  }); 
  }
} 

