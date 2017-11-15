const url = "http://api.coindesk.com/v1/bpi/historical/close.json";

$(document).ready( () => {
  const currencySelect = $("#currency");
  const ctx = $('#myChart').get(0).getContext("2d");

  function update(){
    let currencyUrl = `${url}?currency=${currencySelect.val()}`;
    createChart(currencyUrl);
  }

  function createChart(url){
    axios.get(url)
    .then(function(response) {
      console.log(response);

      $('#max').text(Math.max(...Object.values(response.data.bpi)) + " " + currencySelect.val());
      $('#min').text(Math.min(...Object.values(response.data.bpi)) + " " + currencySelect.val());

      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: Object.keys(response.data.bpi),
        datasets: [{
            data: Object.values(response.data.bpi),
            label: "Bitcoin price index",
            borderColor: "Grey",
            fill: true
          }
        ]
      },
      options: { }
    });

    })
    .catch(function(error) {
      console.log(error);
    });
  }

  $('#button').click(() => {
    let urlDates =
    `${url}?start=${$('#one').val()}&end=${$('#two').val()}&currency=${currencySelect.val()}`;
    createChart(urlDates);
  });

  currencySelect.change(() => {
    update();
  });

  createChart(url);

});
