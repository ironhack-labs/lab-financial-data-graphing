

$(document).ready(()=> {


  $('#filter-date').on('click', (event) => {
    event.preventDefault();
    const dates = {
      startDate: $("#startingDate").val(),
      endDate: $("#endDate").val(),
    };
    console.log("click");
    chart(dates);
  });
  chart();
});

function chart(d){
var url = "";
if(typeof(d)=== "undefined") url = "http://api.coindesk.com/v1/bpi/historical/close.json";
else url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${d.startDate}&end=${d.endDate}`;
console.log(url);
$.ajax({
url: url,
method: "GET",
//dataType: "json" FUCK PARSE
success: (response) => {
  const obj =  JSON.parse(response).bpi;
      let data = {
    labels: [],
    datasets: [
        {
            label: "Bitcoins",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            spanGaps: false,
        }
    ]
};
for(let keys in obj){
  data.labels.push(keys);
  data.datasets[0].data.push(obj[keys]);
}
  const ctx = $("#myChart");
  const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
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
},
error: (err) => console.log(err),
});}
