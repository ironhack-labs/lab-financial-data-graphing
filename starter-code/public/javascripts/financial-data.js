document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://api.coindesk.com/v1/bpi/historical/close.json")
    .then(res => {
      console.log("data", res.data.bpi);
      printTheChart(res.data.bpi);
    });

  const printTheChart = bpi => {
    const bpiDate = Object.keys(bpi);
    const bpiWorth = Object.values(bpi);
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: bpiDate,
        datasets: [
          {
            label: "BPI chart",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: bpiWorth
          }
        ]
      }
    });
  };

  // $("#dateto").click(function blabla() {
  //   let dateto = $("dateto").value;
  // });

  // $("#datefrom").click(function blabla() {
  //   let datefrom = $("datefrom").value;
  // });
});
