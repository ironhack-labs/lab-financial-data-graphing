let LINEDATA = [];
let data = [];
let labels = [];
let dateFrom = document.getElementById("startFrom").value;
let dateTo = document.getElementById("startTo").value;

graph();

document.getElementById("startFrom").onchange = function() {
    dateFrom = document.getElementById("startFrom").value
    graph();
}
document.getElementById("startTo").onchange = function(){
    dateTo = document.getElementById("startTo").value
    graph();
}

function graph() {
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`)
    .then((apiData) => {
    LINEDATA = { ...apiData.data.bpi };
    data = Object.keys(LINEDATA).map(key => LINEDATA[key]);
    labels = Object.keys(LINEDATA);
    new Chart(document.getElementById("chart"), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Bitcoin',
            data: data,
            borderColor: "#3e95cd",
          }
        ]
      }
    });
  });
}