const coindeskAPI = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/close.json"
});

let start;

let end;

//!USES THE START AND END INPUT DATA TO DETERMINE THE DATE RANGE
coindeskAPI
  .get("")
  .then(response => {
    printCharts(Object.keys(response.data.bpi), Object.values(response.data.bpi));
  })
  .catch(err => console.log("error", err));

//!LISTENS WHEN THE START INPUT DATA CHANGES
document.getElementById("start").onchange = () => {
  start = document.getElementById("start").value;
};

//!LISTENS WHEN THE END INPUT DATA CHANGES
document.getElementById("end").onchange = () => {
  end = document.getElementById("end").value;

  axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then(response => {
      printCharts(Object.keys(response.data.bpi), Object.values(response.data.bpi));
    })
    .catch(err => console.log("error", err));
};

const printCharts = (infoKeys, infoValues) => {
  showChart("q1", infoKeys, infoValues);
};

const showChart = (id, infoKeys, infoValues) => {
  new Chart(id, {
    type: "line",
    data: {
      labels: infoKeys,
      datasets: [
        {
          label: "BPI",
          data: infoValues,
          borderColor: "rgba(0, 50, 250, .7)",
          backgroundColor: "rgba(0, 50, 250, .7)",
          borderWidth: 1
        }
      ]
    }
  });
};
