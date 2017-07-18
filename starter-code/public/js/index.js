/* function getPokemonInfo(id) {
  $.ajax({
    url: "http://pokeapi.co/api/v2/pokemon/" + id,
    method: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (err) {
      console.log(err);
    },
  })
}

$("#pokeButton").on('click', function(){
  getPokemonInfo(1);
})

*/
console.log("Something works!");
function getBitCoinPrice() {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: function (response) {
      let json = JSON.parse(response);
      //console.log(""+JSON.stringify(json.bpi));
      json = json.bpi;
      let prices=[];
      let dates = [];

     for(let key in json){
        prices.push(json[key]);
        dates.push(key);
    } 

 /*    for (let key of json) {
        prices.push(json[key]);
        dates.push(key);
} */

    console.log(prices);
    console.log(dates);

    drawGraphic(prices,dates);

    },
    error: function (err) {
      console.log(err);
    },
  })
}

/* $("#bitCoinPrice").on('click', function(){
    console.log("************************************FUNCTION");
  getBitCoinPrice();
}); */

function drawGraphic(prices,dates){
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        labels: dates,
        datasets: [{
          label: 'Fluctuation bitcoin price',
          data: prices,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
};


    var ctx = document.getElementById("myChart").getContext('2d');
    console.log("mychart: "+ctx);
getBitCoinPrice();