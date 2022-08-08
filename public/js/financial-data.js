// Iteration 1:
const ctx = document.getElementById("myChart");

axios
  .get("http://api.coindesk.com/v1/bpi/historical/close.json")
  .then((bitcoin) => {
    console.log(bitcoin);

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(bitcoin.data.bpi),
        datasets: [
          {
            label: "Bitcoin Price indexes",

            data: Object.values(bitcoin.data.bpi),

            backgroundColor: ["rgba(153, 102, 255, 0.2)"],
            borderColor: ["rgba(54, 162, 235, 1)"],
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
  .catch((err) => {
    console.log(err);
  });
