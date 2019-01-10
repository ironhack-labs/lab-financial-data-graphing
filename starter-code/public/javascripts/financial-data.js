document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(res => {
      const data = res.data.bpi;
      printTheChart(data);
    });

  const printTheChart = data => {
    const dates = Object.keys(data);
    const value = Object.values(data);
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Bitcoin Chart",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: value
          }
        ]
      }
    });
  };

  document.querySelectorAll("#start-date, #end-date").forEach(input => {
    input.addEventListener("change", function(ev) {
      // console.log(ev.target.value);
      axios
        .get(
          "http://api.coindesk.com/v1/bpi/historical/close.json?start=" +
            document.getElementById("start-date").value +
            "&end=" +
            document.getElementById("end-date").value
        )
        .then(res => {
          const data = res.data.bpi;
          printTheChart(data);
        });

      const printTheChart = data => {
        const dates = Object.keys(data);
        const value = Object.values(data);
        const ctx = document.getElementById("myChart").getContext("2d");
        const chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: dates,
            datasets: [
              {
                label: "Bitcoin Chart",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: value
              }
            ]
          }
        });
      };
    });
  });
});
