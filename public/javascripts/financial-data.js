const url = "http://api.coindesk.com/v1/bpi/historical/close.json";

const ctx = document.getElementById("myChart").getContext("2d");

//ANDRE review could not code along, just can't do it
const from = document.getElementById("from");
const to = document.getElementById("to");
let startInputValue;
let endInputValue;

from.onchange = (event) => {
  startInputValue = event.target.value;
};
to.onchange = (event) => {
  endInputValue = event.target.value;
};

function bitcoinTracker() {
  if (!startInputValue || !endInputValue) {
    return;
  }
  getUpdatedValues();
}

function getUpdatedValues() {
  axios.get(`${url}?start=${startInputValue}&end=${endInputValue}`);

  axios.get(getUpdatedValues).then((response) => {
    const labels = Object.keys(response.data.bpi);
    const data = Object.values(response.data.bpi);
    drawChart(labels, data);
  });
}
//end of Review
axios
  .get(url)
  .then((response) => {
    //console.log(response.data.bpi);
    //as I need to change data and label in script i customise it to my data
    const labels = Object.keys(response.data.bpi);
    const data = Object.values(response.data.bpi);
    drawChart(labels, data);
  })
  .catch((error) => {
    console.log(error);
  });

function drawChart(labels, data) {
  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin prices",
          data: data,
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
//all good above! Do not change!

// axios
//   .get(
//     "https://api.coindesk.com/v1/bpi/historical/close.json?start=2015-19-11&end=2020-19-11"
//   )
//   .then((response) => {
//     console.log(response);
// const start = document.getElementById("start");
// const end = document.getElementById("end");

// const start = document.querySelector('#start');
// start.addEventListener('change', (event) => {
//   const result = document.querySelector('.result');
//   result.textContent = `You like ${event.target.value}`;
// });

//   })
//   .catch((error) => {
//     console.log(error);
//   });
