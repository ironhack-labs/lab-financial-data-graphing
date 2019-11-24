const bitcoinApi = new BitcoinApi(
    "http://api.coindesk.com/v1/bpi/historical/close.json"
  );
  
  let chart = null;
  
  document.getElementById("display-chart").addEventListener("click", e => {
    let startDate = document.getElementById("date-start").value;
    let endDate = document.getElementById("date-end").value;
    let currency = "USD";
   
  
    if (startDate && endDate) {
      bitcoinApi.getData(startDate, endDate, currency).then(timeBetween => {
        let labels = [];
        let values = [];
        Object.keys(timeBetween.data.bpi).forEach(time => {
          values.push(timeBetween.data.bpi[time]); 
          labels.push(time); 
        });
        console.log(values)
        document.getElementById("max-value").textContent= Math.max(...values);
        document.getElementById("min-value").textContent= Math.min(...values);
        console.log(Math.min(...values))
        printChart(labels, values);
      });
    }
  });
  
  const printChart = (labels, data) => {
    const mycanvas = document.getElementById("canvas");
    const ctx = mycanvas.getContext("2d");
    if (chart) {
      chart.clear();
      chart.destroy();
    }
    chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Bitcoin/$",
            backgroundColor: "green",
            data
          }
        ]
      }
    });
  };