const ctx = document.getElementById("myChart").getContext("2d");

axios
  .get("https://api.coindesk.com/v1/bpi/historical/close.json")
  .then((response) => {
    console.log(response.data.bpi);

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(response.data.bpi),
        datasets: [
          {
            label: "Bitcoin Price Index",
            data: Object.values(response.data.bpi),
            backgroundColor: ["rgba(255, 99, 132, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  })
  .catch((err) => console.log(err));
