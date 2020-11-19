const url = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios
  .get(url)
  .then((response) => {
    //console.log("response:", response);
    //console.log("response:", response.data.bpi);
    const labels = Object.keys(response.data.bpi);
    const values = Object.values(response.data.bpi);
    createChart(labels, values); // call the function after receiving the data
  })
  .catch((error) => {
    console.log(error);
  });

function createChart(labels, values) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: values,
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
}
