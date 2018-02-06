function main () {
  const coinDeskApi = axios.create({
    baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
  })

  function getCoinInfo(id) {
  coinDeskApi.get(id)
  .then(response => {
    console.log(response.data.bpi);
    var p = response.data.bpi;
    var date;
    var price;
    var ourData = [];

    for (var key in p) {
      if (p.hasOwnProperty(key)) {

        // ourData.push({
        //   x: key,
        //   y: p[key]
        // });
        ourData.push(p[key]);
        //console.log(key + " -> " + p[key]);
      }
    }
    
    console.log(ourData);

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: ourData,
      //options : options
    })
  })
  .catch(err => {
    console.error(err)
  })
  }

  getCoinInfo();

}

window.onload = main;

// document.getElementById("pokeButton").onclick = function(){
// getCoinInfo(1);
// }