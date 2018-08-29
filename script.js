function drawChart(startDate, endDate, currency) {
  console.log(currency);

  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`
    )
    .then(result => {
      var ctx = document.getElementById("myChart").getContext("2d");

      const labels = [];
      const values = [];
      for (let date in result.data.bpi) {
        labels.push(date);
        values.push(result.data.bpi[date]);
      }

      $("#chart-info").text("");
      $("#chart-info").append(
        `<p>Minimum: ${Math.min(...values)}</p><p>Maximum: ${Math.max(
          ...values
        )}</p>`
      );

      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Bitcoin rate",
              data: values,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true
        }
      });
    });
}
const date = new Date().getDate();

setDefaultDates();

function setDefaultDates() {
  const pastDays = 7;
  $("#start-date").val(getpastDate(pastDays));
  $("#end-date").val(getTodayDate());

  const startDate = $("#start-date").val();
  const endDate = $("#end-date").val();
  const currency = $("#currency").val();

  drawChart(startDate, endDate, currency);
}

function getTodayDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = `${yyyy}-${mm}-${dd}`;
  return today;
}

function getpastDate(pastDays) {
  var today = new Date();
  today.setDate(today.getDate() - pastDays);
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = `${yyyy}-${mm}-${dd}`;
  return today;
}

function updateChart() {
  const startDate = $("#start-date").val();
  const endDate = $("#end-date").val();
  const currency = $("#currency").val();
  if (startDate >= endDate) return;
  if (startDate === "" || endDate === "") return;
  drawChart(startDate, endDate, currency);
}
