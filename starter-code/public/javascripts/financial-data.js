const getData = (start, end) => {
  let apiBit = `http://api.coindesk.com/v1/bpi/historical/close.json`;
  if (start && end) {
    apiBit = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`;
  }

  axios.get(apiBit).then(re => {
    const data = re.data.bpi;

    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Bit ",
            data: Object.values(data),
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {yAxes: [{ticks: {beginAtZero: true}}]}
      }
    });
  });
};

getData();

let start = document.getElementById("inicio");
let end = document.getElementById("final");

window.onload = () => {
  start.addEventListener("change", x=> {
    getData(start.value, end.value);
  });
  end.addEventListener("change", x=> {
    getData(start.value, end.value);
  });
};
