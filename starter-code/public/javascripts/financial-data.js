$(document).ready(()=> {
  // Make a request for a user with a given ID
  var ctx = document.getElementById("myChart").getContext('2d');

  $('#btn').click(() => {
  let start = $("#from").val();
  let end = $("#to").val();
  let index = $("#curr").val();
  console.log(index)
  let url = 'http://api.coindesk.com/v1/bpi/historical/close.json?currency=' + index + '&start=' + start + '&end=' + end;
  axios.get(url)
    .then(function (response) {
      let dates = Object.keys(response.data.bpi);
      let values = Object.values(response.data.bpi);
      let max = Math.max(...values);
      let min = Math.min(...values);
      console.log(dates,values, max, min);

      $('#max').text(`Max: ${max} ${index}`)
      $('#min').text(`Min: ${min} ${index}`)

      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: dates,
            datasets: [{
                label: "Bitcoin values",
                borderColor: 'rgb(255, 99, 132)',
                data: values,
            }]
        },

      });

    })
    .catch(function (error) {
      console.log(error);
    });
  })

});
