const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

const $input1 = document.getElementById("fromDate");
const $input2 = document.getElementById("toDate");
const $input3 = document.getElementById("currency");

let chart;
window.chart = chart;

function getBtcHistoricPrice(fromDate, toDate, currency) {
  //   if (!fromDate || !toDate) return;

  axios
    .get(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
    )
    .then((response) => {
      console.log("Response from API is: ", response.data);
      const days = Object.keys(response.data.bpi);
      console.log("days=", days);
      const values = [];

      days.forEach(function (day) {
        values.push(Number(response.data.bpi[day]));
      });

      console.log("values=", values);

      if (!chart) {
        chart = new Chart(ctx, {
          type: "line",
          data: {
            labels: days,
            datasets: [
              {
                label: "Btc price",
                data: values,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
              },
            ],
          },
        });
      } else {
        // maj
        chart.data.labels = days;
        chart.data.datasets[0].data = values;
        console.log("update");
        chart.update();
      }
    })

    .catch((err) => console.log(err));
}

getBtcHistoricPrice($input1.value, $input2.value, $input3.value);

$input1.addEventListener("change", () => {
  console.log("change from");

  getBtcHistoricPrice($input1.value, $input2.value, $input3.value);
});

$input2.addEventListener("change", () => {
  console.log("change to");

  getBtcHistoricPrice($input1.value, $input2.value, $input3.value);
});

$input3.addEventListener("change", () => {
  console.log("change currency");

  getBtcHistoricPrice($input1.value, $input2.value, $input3.value);
});
