$(document).ready(() => {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: showMeTheMoney,
    error: thereIsNoMoney
  });

  $(".form-filters input").on("change", event => {
    let dateFrom = $("#dateFrom").val();
    let dateTo = $("#dateTo").val();
    $.ajax({
      url: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`,
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
});
