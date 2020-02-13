const apiUrl = `http://api.coindesk.com/v1/bpi/historical/close.json`;

axios
  .get(apiUrl)
  .then(responseFromAPI =>
    console.log("The response from API: ", responseFromAPI)
  )
  .catch(err => console.log("Error while getting the data: ", err));

var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45]
      }
    ]
  },

  // Configuration options go here
  options: {}
});
