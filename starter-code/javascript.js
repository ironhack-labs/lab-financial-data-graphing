axios({
  method: "get",
  url: "http://api.coindesk.com/v1/bpi/historical/close.json",
  responseType: "json"
})
.then(res=>pinta(res));

function pinta(response) {
  const dates = Object.keys(response.data.bpi);
  const values = Object.values(response.data.bpi);
  const ctx = document.getElementById("myChart").getContext('2d');
  const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: dates,
    datasets: [{
        data: values,
        label: "Bitcoin Price Index",
        borderColor: "#A6B2B8",
        fill: "#C1CED4"
      }]
  },
  options: {
    title: {
      display: true,
      text: ''
    }
  }
});

}
