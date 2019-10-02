const restCountriesApi = axios.create({});

function getFinancial(start, end) {
  restCountriesApi
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`
    )
    .then(responseFromAPI => {
      var date = responseFromAPI.data.bpi;
      const dates = Object.keys(date);
      const values = Object.values(date);
      var ctx = document.getElementById("myChart").getContext("2d");
      console.log({ dates });
      var myChart = new Chart(ctx, {
        type: "bar", // If you want to see as lines, just change to "line"
        data: {
          labels: dates,
          datasets: [
            {
              label: "# of Votes",
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
      console.log("Response from API is: ", responseFromAPI.data);
      console.log(responseFromAPI.data.bpi[0]);
      console.log(data.bpi[0]);
    })
    .catch(err => console.log("Error is: ", err));
}

// document.getElementById("theButton").onclick = function() {
//   const country = document.getElementById("theInput").value;
//   getCountryInfo(country);
// };

document.getElementById("theButton").onclick = () => {
  const dataInit = document.getElementById("fromDate").value;
  const dataEnd = document.getElementById("toDate").value;
  getFinancial(dataInit, dataEnd);
  console.log(dataInit);
};
