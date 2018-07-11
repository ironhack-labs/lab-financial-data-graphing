let labels = [];
let value = [];

let dateOne = "", dateTwo = "", currency = "";

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false
          }
        }
      ]
    }
  }
});

function apiCall(dateOne, dateTwo, currency) {
  let url = "http://api.coindesk.com/v1/bpi/historical/close.json"
  if(dateOne != "" && dateTwo != ""){
    url += `?start=${dateOne}&end=${dateTwo}`
    if(currency != "") {
      url += `&currency=${currency}`
    }
  } else {
    if(currency != "") {
      url += `?currency=${currency}`
    }
  } 

  axios
    .get(url)
    .then(data => {
      labels = Object.keys(data.data.bpi);
      value = Object.values(data.data.bpi);
      for (var i = 0; i < labels.length; i++) {
        myChart.data.labels[i] = labels[i];
        myChart.data.datasets[0].data[i] = value[i];
      }
      myChart.update();
      console.log(labels, value);
    });
}

let print = () => {
  dateTwo = document.getElementById("dateTwo").value;
  dateOne = document.getElementById("dateOne").value;
  currency = document.getElementById("currency").value
  apiCall(dateOne, dateTwo, currency)
};

apiCall("", "", "");
document.getElementById("dateTwo").addEventListener("change", print);

document.getElementById("currency").addEventListener("change", print);
