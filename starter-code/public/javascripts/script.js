document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

$("input, select").change(function() {
  let from = $(".from").val();
  let to = $(".to").val();
  let currency = $("#currency").val();

  if (from && to && currency) {
    axios
      .get(
        `http://api.coindesk.com/v1/bpi/historical/close.json?start=${from}&end=${to}&currency=${currency}`
      )
      .then(result => {
        // console.log(result.data);
        const dates = Object.keys(result.data.bpi);
        const values = Object.values(result.data.bpi);

        let max = values.reduce(function(a, b) {
          return Math.max(a, b);
        });
        let min = values.reduce(function(a, b) {
          return Math.min(a, b);
        });

        const ctx = document.getElementById("myChart").getContext("2d");
        $(".max").text(`Max: ${max} ${currency}`);
        $(".min").text(`Min: ${min} ${currency}`);

        let myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: dates,
            datasets: [
              {
                label: ["Bitcoin Price Index"],
                data: values,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255,99,132,1)",
                borderWidth: 1
              }
            ]
          },
          options: {}
        });
      });
  }
});
