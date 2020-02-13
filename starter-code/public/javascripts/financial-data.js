const baseURL = "http://api.coindesk.com/v1/bpi/historical/close.json";

axios
  .get(baseURL)
  .then(showData => {
    console.log(showData.data["bpi"]);
    showGraphChart(showData);
  })
  .catch(err => console.log(err));

function showGraphChart(data) {
  const dataApi = data["bpi"];
  const keys = Object.keys(dataApi);
  const values = Object.values(dataApi);

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: keys,
      datasets: [
        {
          label: "Value",
          backgroundColor: "rgb(255, 154, 0)",
          borderColor: "rgb(255, 255, 255)",
          fill: true,
          data: values
        }
      ]
    }
  });
}

// axios
//   .get(baseURL)
//   .then(dataPayload => {
//     console.log(dataPayload.data);
//     printTheChart(dataPayload.data);
//   })
//   .catch(err => console.log(err));

// function printTheChart(data) {
//   const dailyData = data["bpi"];
//   const myKeys = Object.keys(dailyData);
//   const myValues = Object.values(dailyData);
//   console.log(myValues);
//   const ctx = document.getElementById("myChart").getContext("2d");
//   const chart = new Chart(ctx, {
//     type: "line",
//     data: {
//       labels: myKeys,
//       datasets: [
//         {
//           label: "Value",
//           backgroundColor: "rgba(247,255,255, .7)",
//           borderColor: "rgb(247,0,255)",
//           fill: true,
//           data: myValues
//         }
//       ]
//     }
//   });
// }
