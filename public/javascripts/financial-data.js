

// draw-chart function
const drawChart = function(result) {
    const dailyData = result.bpi;

    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map( date => dailyData[date] );
    //get the date from the result array
    document.getElementById('start-date').value = stockDates[0];
    document.getElementById('end-date').value = stockDates[stockDates.length-1];
    //get the max and min from theprice array
    let maxValue = Math.max(...stockPrices);
    let minValue = Math.min(...stockPrices);
    document.getElementById('max-value').innerHTML = `Max:${maxValue}`;
    document.getElementById('min-value').innerHTML = `Min:${minValue}`;

    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
        labels: stockDates,
        datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: stockPrices
        }
      ]
    }
  });
};
// draw the default chart automatically
axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
    .then(result => {
        console.log(result.data);
        drawChart(result.data)
    })
    .catch(e=>console.error(e));

// draw chart by date

const drawChartDate = function(e) {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const currency = document.getElementById('currency').value;
    e.preventDefault();
    e.stopPropagation();
    console.log(startDate,endDate);
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
    .then(result => {
        console.log(result.data);
        drawChart(result.data)
    })
    .catch(e=>console.error(e));
};

const button = document.getElementById('submit-button');
button.addEventListener('click',drawChartDate);

const currency = document.getElementById('currency');

currency.addEventListener('change',drawChartDate );