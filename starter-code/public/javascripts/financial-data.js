let startDate = '2018-10-01';
let endDate = '2018-11-01';
let currency = 'USD';
 function getBitcoinChart() {
  const bitcoinChart = axios.create({
    baseURL: `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`,
  });
              //we are crafting this URL : https://api.iextrading.com/1.0/Bit/aapl/chart
              bitcoinChart.get(`${bitTicket}/chart`)
              .then(response => {
                  printTheChart(response.data);
              })
              .catch(error => {
                  console.log(error);
              });

          //chart rendering function
          const printTheChart = (bitData => {
              const bitLabels = bitData.map(element => element.date);
              const bitPrice = bitData.map(element => element.close); 
              const ctx = document.getElementById('myChart').getContext('2d');

              //here we give the chart the data it needs
              const chart = new Chart(ctx, {
                  type: 'line',
                  data: {
                      labels: bitLabels,
                      datasets: [{
                          label: "bit Chart",
                          backgroundColor: 'rgb(255, 99, 132)',
                          fill: false,
                          tension: 0,
                          pointHoverRadius: 20,
                          borderColor: 'rgb(255, 99, 132)',
                          data: bitPrice,
                      }]
                  }
              });
          });
      }

 function clickHandler() {
  startDate = document.querySelector('#start').value;
  endDate = document.querySelector('#end').value;
  currency = document.querySelector('#currency').value;
  getBitcoinChart();
}
 document.querySelector('#submit').onclick = clickHandler;
 window.onload = () => getBitcoinChart();