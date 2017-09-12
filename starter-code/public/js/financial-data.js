function getFinancial() {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: function (response) {

     lineChart(response)

    },
    error: function (err) {
      console.log(err);
    },
  })
}

$("#button").on('click', function(){
  getFinancial();
})

function lineChart(response){
  var parse = JSON.parse(response);
  var bpi = parse.bpi;
  var keys = Object.keys(bpi);
  var values = Object.values(bpi);
     console.log(Object.values(bpi))
     console.log(Object.keys(bpi))
      var ctx = document.getElementById("myChart").getContext('2d');
      var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: keys,
          datasets: [{
              label: 'Bitcoin Value',
              data: values,
          }]
      },
      options: {}
  });
}


function getFinancialDate(start, end) {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json?start=" + start + "&end=" + end,
    method: "GET",
    success: function (response) {
    console.log(response);

    getChartDate(response);

    },
    error: function (err) {
      console.log(err);
    },
  })
}

$("input").on('change', function(){
  var start = $("#start").val();
  var end = $("#end").val();
  if(end){
    getFinancialDate(start, end);
  }
  
  
})



function getChartDate(response){
  var parse = JSON.parse(response);
  var bpi = parse.bpi;
  var keys = Object.keys(bpi);
  var values = Object.values(bpi);
     console.log(Object.values(bpi))
     console.log(Object.keys(bpi))
      var ctx = document.getElementById("myChart").getContext('2d');
      var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: keys,
          datasets: [{
              label: 'Bitcoin Value',
              data: values,
          }]
      },
      options: {}
  });
}

function getCurrency(currency) {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json?currency=" + currency,
    method: "GET",
    success: function (response) {
    console.log(response);

    getChartCurrency(response);

    },
    error: function (err) {
      console.log(err);
    },
  })
}

$("#currency").on('change', function(){
  var currency = $( "#currency option:selected" ).text();
  getCurrency(currency);

  
})

function getChartCurrency(response){
  var parse = JSON.parse(response);
  var bpi = parse.bpi;
  var keys = Object.keys(bpi);
  var values = Object.values(bpi);
     console.log(Object.values(bpi))
     console.log(Object.keys(bpi))
      var ctx = document.getElementById("myChart").getContext('2d');
      var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: keys,
          datasets: [{
              label: 'Bitcoin Value',
              data: values,
          }]
      },
      options: {}
  });
}




