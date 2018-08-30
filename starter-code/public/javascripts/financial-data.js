axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then(response => {
    let receivedObject = response.data.bpi;
    console.log(receivedObject);

    //ITERATION TWO
    let receivedObjectKeys = Object.keys(receivedObject);
    let receivedObjectValues = Object.values(receivedObject);

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: receivedObjectKeys, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: receivedObjectValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      }
    });
  });


//ITERATION THREE


let historicalData = $('.submit').click(e => {
 e.preventDefault();
 let firstDate = $('.firstDate').val();
 let secondDate = $('.secondDate').val();
 let currency = $('.currency').val();
 historicalChart(firstDate, secondDate, currency);
});
​
function historicalChart(firstDate, secondDate, currency) {
 axios
  .get(
   'https://api.coindesk.com/v1/bpi/historical/close.json?currency=' +
    currency +
    '&start=' +
    firstDate +
    '&end=' +
    secondDate
  )
  .then(function(response) {
   printTheChart(response.data.bpi);
   console.log(currency);
  })
  .catch(function(error) {
   console.log(error);
  });
}
