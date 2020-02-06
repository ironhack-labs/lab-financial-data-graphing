let start = document.getElementById("start");
let end = document.getElementById("end");
let startDate, endDate;

let initial = () => {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(response => {
      // console.log(response.data.bpi);
      const financialList = response.data.bpi;
      let ctx = document.getElementById("myChart").getContext("2d");
      let chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Object.keys(financialList),
          datasets: [
            {
              label: "Financial Dataset",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: Object.values(financialList)
            }
          ]
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  return;
};

// listen the input
initial();

start.onchange = () => {
  startDate = start.value;
  update(startDate, endDate);
};

end.onchange = () => {
  endDate = end.value;
  update(startDate, endDate);
};

let update = (startDate, endDate) => {
  if (!startDate || !endDate) {
    initial();
  } else {
    axios
      .get(
        `http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`
      )
      .then(response => {
        // console.log(response.data.bpi);
        const financialList = response.data.bpi;
        let ctx = document.getElementById("myChart").getContext("2d");
        let chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: Object.keys(financialList),
            datasets: [
              {
                label: "Financial Dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: Object.values(financialList)
              }
            ]
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
    return;
  }
};
