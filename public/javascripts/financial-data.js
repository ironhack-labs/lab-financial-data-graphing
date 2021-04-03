const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const baseUrl = "http://api.coindesk.com/v1/bpi/historical/close.json";

let start;
let end;

startDateInput.onchange = (event) => {
  start = event.target.value;
  console.log(start);
  getHistoricalData();
};

endDateInput.onchange = (event) => {
  end = event.target.value;
  console.log(end);
  getHistoricalData();
};

function getHistoricalData() {
  if (!end || !start) {
    return;
  }
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate < startDate) {
    console.log(
      "You end date is earlier than your start date. Fix it, you silly goose!"
    );
    return;
  }

  axios
    .get(`${baseUrl}?start=${start}&end=${end}`)
    .then((response) => {
      console.log(response);
      const bitcoinData = response.data.bpi;
      const yAxis = Object.values(bitcoinData);
      const xAxis = Object.keys(bitcoinData);
      drawChart(yAxis, xAxis);
    })

    .catch((error) => {
      console.log(error);
      // Create a message to user using DOM! :)
    });
}

function drawChart(yAxis, xAxis) {
  const ctx = document.getElementById("myChart");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xAxis,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: yAxis,
        },
      ],
    },
  });
}
getHistoricalData();
