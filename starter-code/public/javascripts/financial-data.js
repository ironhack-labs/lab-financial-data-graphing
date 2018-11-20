window.onload = function() {

    let start='';
    let end = '';
    let currency = 'USD';
    let date = '';
    let route= `https://api.coindesk.com/v1/bpi/historical/close.json?${currency}${date}`;

  function ajaxrequest(ruta) {
    axios.get(ruta).then(response => {
      printTheChart(response.data.bpi);
    });
  }

  function getDataFromApi() {
    ajaxrequest(route);
  }

  function changeDate(startDate, endDate) {
    if (startDate.length > 0 && endDate.length > 0) {
      start = startDate;
      end = endDate;
      date = `&start=${start}&end=${end}`;
      route= `https://api.coindesk.com/v1/bpi/historical/close.json?${currency}${date}`;
      ajaxrequest(route);
    }
  }

  function changeCurrency(currencyValue){
      console.log(currencyValue);
    currency = currencyValue;
    route= `https://api.coindesk.com/v1/bpi/historical/close.json?${currency}${date}`;
    ajaxrequest(route);

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
  var currencyValue = document.getElementById("selector");

  startDate.addEventListener("change", () =>
    changeDate(startDate.value, endDate.value)
  );
  endDate.addEventListener("change", () =>
    changeDate(startDate.value, endDate.value)
  );

  currencyValue.addEventListener("change", () =>
    changeCurrency(currencyValue.value)
  );
};
