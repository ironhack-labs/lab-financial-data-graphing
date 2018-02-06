var ctx = document.getElementById("myChart");
function getDates(startDate, endDate) {
  axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
    .then(res => {
      var dates = Object.keys(res.data.bpi);
      // console.log(dates);
      var values = Object.values(res.data.bpi);
      // console.log(values);
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Bitcoin evolution",
              data: values
            }
          ]
        }
      });
    })
    .catch(err => {
      console.error(err);
    });
}

// $("#start-date").change(getDates($("#start-date").prop("value"), $("#end-date").prop("value")));

getDates("2017-01-01", "2018-01-01");
