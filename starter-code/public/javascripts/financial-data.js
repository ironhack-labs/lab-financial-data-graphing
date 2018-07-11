$(() => {
  const url = "http://api.coindesk.com/v1/bpi/historical/close.json";

  const getBpi = (() => {
    $.ajax(url).then(data => {
      const dataParser = JSON.parse(data).bpi;
      myChart(dataParser);
    });
  })();

  var id;
  var fd;
  var cur;
  $('#initial-datepicker').change(()=>{
    id = $('#initial-datepicker').val();
    console.log(id);
  })
  $('#final-datepicker').change(()=>{
    fd = $('#final-datepicker').val();
    console.log(fd);
    const dateUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${id}&end=${fd}`;
    $.ajax(dateUrl).then(data => {
      const dataParser = JSON.parse(data).bpi;
      myChart(dataParser);
    });
  })

  $('#currency').change(()=>{
    cur = $('#currency').val();
    const dateUrl = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${cur}`;
    $.ajax(dateUrl).then(data => {
      const dataParser = JSON.parse(data).bpi;
      myChart(dataParser);
    });
  })

  
  var myChart = (stockData) => {
    console.log('stock data: ', stockData)
    let stockLabels = Object.keys(stockData);
    let stockPrice = Object.values(stockData);
    $('#min-val').text(Math.min.apply(null, stockPrice))
    $('#max-val').text(Math.max.apply(null, stockPrice))
    console.log(stockLabels, stockPrice)
    let ctx = document.getElementById("chart").getContext("2d");
    let chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: stockLabels,
        datasets: [
          {
            label: "Bitcoin Price Index",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: stockPrice
          }
        ]
      }
    });
  };
});
