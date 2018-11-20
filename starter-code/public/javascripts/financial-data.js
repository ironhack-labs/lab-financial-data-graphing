window.onload = function() {
  function ajaxrequest(ruta) {
    axios.get(ruta).then(response => {
      printTheChart(response.data.bpi);
    });
  }

  function getDataFromApi() {
    ajaxrequest("http://api.coindesk.com/v1/bpi/historical/close.json");
  }

  function changeDate(start, end) {
    if (start.length > 0 && end.length > 0) {
      let dateruta = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`;
      ajaxrequest(dateruta);
    }
  }

  const printTheChart = dataObject => {
    const stockLabels = Object.keys(dataObject);
    const stockPrice = Object.values(dataObject);
    const ctx = document.getElementById("mycanvas").getContext("2d");

    //here we give the chart the data it needs
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: stockLabels,
        datasets: [
          {
            label: "Stock Chart",
            backgroundColor: "rgb(255, 99, 132)",
            fill: true,
            tension: 0,
            pointHoverRadius: 20,
            borderColor: "rgb(255, 99, 132)",
            data: stockPrice
          }
        ]
      }
    });
  };

  document.getElementById("getData").onclick = getDataFromApi;
  var startDate = document.getElementById("startDate");
  var endDate = document.getElementById("endDate");

  startDate.addEventListener("change", () =>
    changeDate(startDate.value, endDate.value)
  );
  endDate.addEventListener("change", () =>
    changeDate(startDate.value, endDate.value)
  );
};
