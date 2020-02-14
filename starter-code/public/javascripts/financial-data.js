document.addEventListener("DOMContentLoaded", function() {
  //Get canvas ctx and create line chart
  const ctx = document.getElementById("chart").getContext("2d");
  const myLineChart = new Chart(ctx, {
    type: "line"
  });

  //Get and represent data from api
  const coinDeskApiBaseUrl =
    "http://api.coindesk.com/v1/bpi/historical/close.json";

  function getBPI(url = coinDeskApiBaseUrl) {
    axios
      .get(url)
      .then(responseFromAPI => {
        //Get data from API
        const { bpi } = responseFromAPI.data;

        //Represent data and update chart
        myLineChart.data.labels = Object.keys(bpi);
        myLineChart.data.datasets = [
          {
            label: "Bitcoin price index",
            data: Object.values(bpi)
          }
        ];
        myLineChart.update();

        //Extreme values
        minVal.innerHTML =
          Math.min(...Object.values(bpi)) + " " + currency.value;
        maxVal.innerHTML =
          Math.max(...Object.values(bpi)) + " " + currency.value;

        //Set default date
        sDate.defaultValue = Object.keys(bpi)[0];
        eDate.defaultValue = Object.keys(bpi)[Object.keys(bpi).length - 1];
      })
      .catch(err => console.log("Error is: ", err));
  }

  getBPI();

  const errorMsg = document.getElementById("error");

  //Date range filter
  [sDate, eDate].forEach(e => {
    e.addEventListener("change", function() {
      if (e.value.length == 0) {
        //If user deletes field input, input gets retrieves default value. nOT WORKING
        getBPI();
      } else {
        const date1 = new Date(sDate.value);
        const date2 = new Date(eDate.value);
        const now = new Date();

        if (date1.getTime() < date2.getTime() && date2 <= now.getTime()) {
          errorMsg.innerHTML = "";
          const url =
            coinDeskApiBaseUrl +
            "?start=" +
            sDate.value +
            "&end=" +
            eDate.value;
          getBPI(url);
        } else {
          errorMsg.innerHTML = "Please select a valid date range";
        }
      }
    });
  });

  //Currency filter
  currency.addEventListener("change", function() {
    const url = coinDeskApiBaseUrl + "?currency=" + currency.value;
    getBPI(url);
  });
});
