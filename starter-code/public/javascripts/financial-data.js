const coinDesk = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/"
});

var ctx = document.getElementById("myFinancialChart").getContext("2d");

function getCoinInfo() {
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  coinDesk
    .get(`historical/close.json?start=${startDate}&end=${endDate}`)
    .then(res => {
      console.log(res.data.bpi);
      const data = res.data.bpi;
      console.log(Object.keys(data));
      console.log(startDate, endDate);
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
        // options: null

        // start=<startDate> & end=<endDate>,
      }).catch(err => {
        console.log(err);
      });
    });
}

document.getElementById("graph").onclick = function() {
  getCoinInfo();
};
