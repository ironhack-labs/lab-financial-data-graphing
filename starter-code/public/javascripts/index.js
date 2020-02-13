    const ctx = document.getElementById("coinChart").getContext("2d");
    const lineChart = new Chart(ctx,{
      type: 'line',
    });

    async function updateChart() {
      const dateA = document.getElementById("dateA").value;
      const dateB = document.getElementById("dateB").value;
      const currency = document.getElementById("currency").value;
  
      let financialData = null;

      if(dateA.length > 0 && dateB.length > 0) {
        financialData = await getHistoricalDataByDate(currency, dateA, dateB);
      } else {
        financialData = await getHistoricalData(currency);
      }
      
  
      const labels = Object.keys(financialData.bpi)
      const data = labels.map(label => financialData.bpi[label]);

      lineChart.data.labels = labels;
      lineChart.data.datasets = [{
          label: 'Coin Desk',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: data
        }];
      lineChart.update();

      // Show max and min values
      document.getElementById("maxValue").innerHTML = "Max Value " + Math.max(...data);
      document.getElementById("minValue").innerHTML = "Min Value " + Math.min(...data);
      
    }

    updateChart();