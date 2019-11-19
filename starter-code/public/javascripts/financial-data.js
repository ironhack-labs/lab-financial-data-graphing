let LINEDATA = [];
let data = [];
let labels = [];
let dateFrom = document.getElementById("start").value;
let dateTo = document.getElementById("end").value;

graph();

document.getElementById("start").onchange = function() {
    dateFrom = document.getElementById("start").value
    graph();
}
document.getElementById("end").onchange = function(){
    dateTo = document.getElementById("end").value
    graph();
}

function graph() {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`)
    .then((apiData) => {
    LINEDATA = { ...apiData.data.bpi };
    data = Object.keys(LINEDATA).map(key => LINEDATA[key]);
    labels = Object.keys(LINEDATA);
    new Chart(document.getElementById("myChart"), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Bitcoin',
            data: data,
            borderColor: "#F08080",
          }
        ]
      }
    });
  });
} 