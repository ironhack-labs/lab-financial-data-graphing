var labels = [];
var values = [];

$("#currency").change(function(){
  var currency = document.getElementById("currency").value;
  console.log(currency);
  getFinancialData(currency);
});



function getFinancialData(currency) {
 $.ajax({
   url: "http://api.coindesk.com/v1/bpi/historical/close.json?currency="+currency,
   method: "GET",
   dataType: 'json',
   success: function (response) {
     handleFinancialData(response);
   },
   error: function (err) {
     console.log(err);
   },
 });
}

getFinancialData("USD");

var handleFinancialData = function (financialData) {
  labels = Object.keys(financialData.bpi);
  values = Object.values(financialData.bpi);
  drawChart(labels,values);
  var min = Math.min.apply(0,values);
  var max = Math.max.apply(0,values);
  console.log(min, max);
  document.getElementById("max").value = max;
  document.getElementById("min").value= min;
  //console.log(Object.keys(financialData.bpi));
  //console.log(Object.values(financialData.bpi));
};

function drawChart(labels,values){

var data = {
   labels: labels,
datasets: [
       {
           label: "My First dataset",
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
           data: values,
           spanGaps: false,
       }
   ]
};

var ctx = document.getElementById("myChart");
var myLineChart = new Chart(ctx, {
 type: 'line',
 data: data,
 options: {
       scales: {
           xAxes: [{
               display: true
           }],
           yAxes:[{

           }]
       }
   }
});
}

////////////////////////////////////////////



$("#dates").click(function(){
  var startDay = document.getElementById("start-date").value;
  var endDay = document.getElementById("end-date").value;
  console.log(startDay,endDay);

  getFinancialDatabyDate(startDay,endDay);

});


function getFinancialDatabyDate(startDay,endDay) {
 $.ajax({
   url: "http://api.coindesk.com/v1/bpi/historical/close.json?start="+startDay+"&end="+endDay,
   method: "GET",
   dataType: 'json',
   success: function (response) {
     handleFinancialDatabyDate(response);
   },
   error: function (err) {
     console.log(err);
   },
 });
}



var handleFinancialDatabyDate = function (financialData) {
  labels = Object.keys(financialData.bpi);
  values = Object.values(financialData.bpi);
  drawChartbyDates(labels,values);
  //console.log(Object.keys(financialData.bpi));
  //console.log(Object.values(financialData.bpi));
};

function drawChartbyDates(labels,values){

var databyDates = {
   labels: labels,
datasets: [
       {
           label: "My First dataset",
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
           data: values,
           spanGaps: false,
       }
   ]
};

var ctxbyDate = document.getElementById("myChartBtwDates");
var myLineChart = new Chart(ctxbyDate, {
 type: 'line',
 data: databyDates,
 options: {
       scales: {
           xAxes: [{
               display: true
           }],
           yAxes:[{
             ticks:{
              startAtZero: true
              }
           }]
       }
   }
});
}
