const currency = getElementById("currency");

const url = "http://api.coindesk.com/v1/bpi/historical/close.json";
function update (){
  let currency=
  currency.options[currency.selectedIndex].value;
  let currencyUrl= url+"?currency="+currency;
  ejecute (currencyUrl);

}
function ejecute (url){

  axios.get(url)
  .then(function(response) {
    console.log(response);
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
