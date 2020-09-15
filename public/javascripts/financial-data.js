const url = `http://api.coindesk.com/v1/bpi/historical/close.json`;
let ctx = document.getElementById("myChart").getContext("2d");

axios
  .get(url)
  .then((data) => {
    // console.log(data.data.bpi);
    let keys = Object.keys(data.data.bpi);
    let values = Object.values(data.data.bpi);
    // console.log(keys);
    // console.log(values)
    createChart(keys, values);
  })
  .catch((err) => {
    console.log(err);
  });

function createChart(xaxis, yaxis) {
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      //x Axis
      labels: xaxis,
      datasets: [
        {
          label: "Bitcoin Prica Index",
          //y axis
          data: yaxis,
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

/* 3rd iteration */
const startDate = document.getElementById("start-date");
const finishDate = document.getElementById("finish-date");

startDate.addEventListener("change", (event) => {
  if (finishDate.value) {
    filterData();
  }
});

finishDate.addEventListener("change", (event) => {
  if (startDate.value) {
    filterData();
  }
});

function filterData() {
  const urlFilter = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate.value}&end=${finishDate.value}`;
  console.log(urlFilter);
  axios
    .get(urlFilter)
    .then((data) => {
        let keys = Object.keys(data.data.bpi);
        let values = Object.values(data.data.bpi);
        createChart(keys, values);
    })
    .catch((err) => {
      console.log(err);
     // console.log(error.response.data)
    });
}

