var link = `http://api.coindesk.com/v1/bpi/historical/close.json`;

const coinApi = axios.create({
  baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json`
});

function getFinancialInfo(id) {
  axios
    .get(id)
    .then(response => {
      var array = Object.values(response.data.bpi);
      var label = array.map((value, i) => {
        return i + 1;
      });

      new Chart(document.getElementById("myChart"), {
        type: "line",
        data: {
          labels: label,
          datasets: [
            {
              data: array,
              label: "Bitcoin",
              borderColor: "#3e95cd",
              fill: false
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Bitcoin Price"
          }
        }
      });
    })
    .catch(err => {
      console.error(err);
    });
}

window.onload = function() {
  var financialInfo = getFinancialInfo(link);
};
