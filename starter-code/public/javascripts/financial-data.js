const url = "http://api.coindesk.com/v1/bpi/historical/close.json";
const currencySelect = document.getElementById("currency");

function update (){
  let currency=
  currencySelect.options[currencySelect.selectedIndex].value;
  let currencyUrl= url+"?currency="+currency;
  ejecute (currencyUrl);

}

function ejecute (url){

  axios.get(url)
  .then(function(response) {
    console.log(response);

    var max = document.getElementById('max').innerHTML =
    Math.max(...Object.values(response.data.bpi)) + " " + currencySelect.options[currencySelect.selectedIndex].value;
    var min = document.getElementById('min').innerHTML =
    Math.min(...Object.values(response.data.bpi)) + " " + currencySelect.options[currencySelect.selectedIndex].value;
    const ctx = document.getElementById("myChart").getContext("2d");
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
    options: {
      title: {
        display: true,
        text: ''
      }
    }
  });

  })
  .catch(function(error) {
    console.log(error);
  });
}

ejecute(url);
