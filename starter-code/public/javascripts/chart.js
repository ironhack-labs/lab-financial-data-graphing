//Create canvas and chart

let chart;
const ctx = document.getElementById("myChart").getContext("2d");
let myChart = (labels, data, title) => {
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: ["rgba(26, 162, 97, 0.2)"],
          borderColor: ["rgba(26, 162, 97, 1)"],
          borderWidth: 1
        }
      ]
    }
  });
};
