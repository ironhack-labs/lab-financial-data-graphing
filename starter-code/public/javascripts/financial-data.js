var update = function () {
  console.log($('#from'));
  let from = $('#from').val();
  let to = $('#to').val();
  let c = $('#c').val();
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${c}`)
    .then(function (response) {
      x = response.data.bpi;

      data = {
        labels: Object.keys(x),
        datasets: [{
          label: "Bitchcoins",
          borderColor: 'rgb(255, 99, 132)',
          data: Object.values(x),
        }]
      }

      var ctx = document.getElementById("myLineChart").getContext('2d');
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: data,
      });

      var min = Math.min.apply(null, Object.values(x));
      var max = Math.max.apply(null, Object.values(x));
      $('#min').empty().append(min);
      $('#max').empty().append(max);
    })

    

    .catch(function (error) {
      console.log(error);
    });
};

$('#from').change(update);
$('#to').change(update);
$('#c').change(update);
