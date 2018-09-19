document.addEventListener('DOMContentLoaded', () => {

  let from = $("#from").val()
  let to = $("#to").val()
  let currency = $("#currency").val()
  let Bitcoinurl  = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`
  document.getElementById("submit").onclick = function(e){
    from = $("#from").val();
    $("#from").val(from);
    to = $("#to").val();
    $("#to").val(to);
    currency = $("#currency").val();
    $("#currency").val(currency);
    Bitcoinurl  = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`;
    
    
    axios.get(Bitcoinurl)  
    .then(function (response) {
      console.log(response.data.bpi)
      printTheChart(response.data.bpi);
    })
    .catch(function (error) {
      console.log(error);
  });
  

  }
  
  
  axios.get(Bitcoinurl)
    .then(function (response) {
      // console.log(response.data.bpi);
     
    })
    .catch(function (error) {
      console.log(error);
  });

axios.get(Bitcoinurl)
    .then(function (response) {
      printTheChart(response.data.bpi);
    })
    .catch(function (error) {
      console.log(error);
  });



let printTheChart = ((bitcoinData) => {
  let bitcoinPrice = Object.values(bitcoinData);
  let bitcoinDate = Object.keys(bitcoinData);
  console.log(bitcoinData)
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: bitcoinDate,
      datasets: [{
        label: "Bitcoin Price Index",
        backgroundColor: 'rgb(95, 193, 249)',
        borderColor: 'rgb(31, 36, 51)',
        data: bitcoinPrice,
      }]
    }
  })
  let max = Math.max.apply(null, bitcoinPrice) 
  let min = Math.min.apply(null, bitcoinPrice) 
  $("#max").text(`Max: ${max} ${currency}`);
  $("#min").text(`Min: ${min} ${currency}`);
});




}, false);