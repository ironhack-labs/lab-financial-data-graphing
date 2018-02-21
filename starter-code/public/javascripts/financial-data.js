const coinApi = axios.create({
  baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json`
});

function getFinancialInfo(id) {
  axios
    .get(id)
    .then(response => {
      var array = Object.values(response.data.bpi);
      array = array.map(num => {
        return parseFloat(num);
      });
      console.log(array);
      var max = Math.max(...array);
      var min = Math.min(...array);
      var label = array.map((value, i) => {
        return i + 1;
      });

      document.getElementById(`js-max-value`).innerHTML = max;
      document.getElementById(`js-min-value`).innerHTML = min;

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

function addDate(string, link) {
  var startDate = document.getElementById(string).value;
  console.log(startDate);
  var bool = false;
  if (startDate !== "") {
    if (string === "dateFrom") {
      link += `?start=${startDate}`;
    } else {
      if (link !== `http://api.coindesk.com/v1/bpi/historical/close.json`)
        link += `&end=${startDate}`;
    }
    bool = true;
  }
  return link;
}

document.getElementById("draw").onclick = function() {
  var link = `http://api.coindesk.com/v1/bpi/historical/close.json`;
  link = addDate("dateFrom", link);
  link = addDate("dateTo", link);
  var currency = document.getElementById("currency").value;
  link += `?currency=${currency}`;
  console.log(link);
  var financialInfo = getFinancialInfo(link);
};
