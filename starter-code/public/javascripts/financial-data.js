$(document).ready(() => {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: showMeTheMoney,
    error: thereIsNoMoney
  });

  $(".form-filters").children().on("change", event => {
    let dateFrom = $("#dateFrom").val();
    let dateTo = $("#dateTo").val();
    let currency = $("#currency option:selected").val();
    $.ajax({
      url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}&currency=${currency}`,
      method: "GET",
      success: showMeTheMoney,
      error: thereIsNoMoney
    });
  });

  function showMeTheMoney(response) {
    const ctx = document.getElementById("myChart");
    const jsonResponse = JSON.parse(response);
    const labels = Object.keys(jsonResponse.bpi);
    const data = Object.values(jsonResponse.bpi);
    let values = getMinAndMax(data);
    drawMinAndMax(values);
    const myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            label: "Bitcoin Price Index",
            data: data
          }],
          labels: labels
        }
        // options: options
    });
  }

  function thereIsNoMoney(error) {
    console.log(error);
  }

  function getMinAndMax(data) {
    let min = Math.min(...data);
    let max = Math.max(...data);
    let values = {
      min: min,
      max: max
    };
    return values;
  }

  function drawMinAndMax(values) {
    let currency = $("#currency option:selected").val();
    $("#minValue").text(values.min + " " + currency);
    $("#maxValue").text(values.max + " " + currency);

  }
});
