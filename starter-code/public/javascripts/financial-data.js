console.log("Hello");

function chart(responseFromAPI) {
  console.log(responseFromAPI);
  var ctx = document.getElementById("myChart").getContext("2d");
  let values = Object.values(responseFromAPI.data.bpi);
  let keys = Object.keys(responseFromAPI.data.bpi);
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: keys,
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
              beginAtZero: false
            }
          }
        ]
      }
    }
  });
}

//https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05

function getfinInfo() {
  let start = document.getElementById("start").value;
  console.log(start);
  let end = document.getElementById("end").value;
  console.log(end);
  /*     const restFinApi = axios.create({
        baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
      }); */

  //start = "2013-09-01";
  //end = "2013-09-05";
  let defaultData = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`;

  if (!start) {
    defaultData = "https://api.coindesk.com/v1/bpi/historical/close.json";
  }

  console.log("WHAAT", defaultData);

  //https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}
  axios
    .get(defaultData)
    .then(responseFromAPI => {
      console.log("Response from API is: ", responseFromAPI.data);

      chart(responseFromAPI);
    })
    .catch(err => {
      console.log("Error is: ", err);
    });
}

function newGetInfo() {}

getfinInfo();
