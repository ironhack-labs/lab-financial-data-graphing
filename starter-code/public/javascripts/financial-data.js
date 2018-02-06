const coinDesk = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});
const ctx = document.getElementById("myChart").getContext("2d");
const start = document.getElementById("start").value;
const end = document.getElementById("end").value;
function getCoinInfo() {
  coinDesk
    .get()
    .then(response => {
      //console.log(response.data.bpi);
      const data = response.data.bpi;

      const myLineChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data)
            }
          ]
        }

        //response.data.bpi
        //options: options
      });
    })
    .catch(err => {
      console.error(err);
    });
  Chart.defaults.line.spanGaps = true;
  Chart.defaults.line.showLines = true;
}

getCoinInfo();
