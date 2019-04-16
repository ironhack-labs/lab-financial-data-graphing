window.onload = () => {

var today = new Date().toISOString().slice(0,10);
var todayYear = new Date();
var currentYear = todayYear.getFullYear();
var start = currentYear +"-01-01";
document.getElementById("dateStart").value = start;
document.getElementById("dateEnd").value = today;

controlsChange();


document.getElementById("dateStart").onchange = controlsChange;
document.getElementById("dateEnd").onchange = controlsChange;
document.querySelector("#isoCurrency").onchange = controlsChange;


function controlsChange(){
  var jsonQuery = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${document.getElementById("dateStart").value}&end=${document.getElementById("dateEnd").value}&currency=${document.getElementById("isoCurrency").value}`;
  axios.get(jsonQuery)
    .then(bitcoinData => {
      const labels = Object.keys(bitcoinData.data.bpi);
      const values = Object.values(bitcoinData.data.bpi);
      var maxValue = Math.max.apply(null, values);  
      var minValue = Math.min.apply(null, values); 
      document.getElementById("maxValue").innerHTML= `Max: ${maxValue} ${document.getElementById("isoCurrency").value} `;
      document.getElementById("minValue").innerHTML= `Min: ${minValue} ${document.getElementById("isoCurrency").value} `;
      draw(labels, values)})          
    .catch(error => {
      console.log(error);
    });

  
}

function draw(labels, values) {
      const ctx = document.getElementById('myChart').getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: "Bitcoin Chart",
            borderWidth: 1,
            borderColor: 'rgb(0, 0, 255)',
            data: values,
          }]
        }
      });
    
}
}
