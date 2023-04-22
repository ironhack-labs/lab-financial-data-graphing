const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");

const $input1 = document.querySelector(".input1");
const $input2 = document.querySelector(".input2");
const $currency = document.querySelector(".currency");
let $maxValue = document.querySelector(".max");
let $minValue = document.querySelector(".min");

[$input1, $input2, $currency].forEach((el) => {
  el.addEventListener("change", (event) => {
    fetchAndDisplayChart();
  });
});

function fetchAndDisplayChart() {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json?start=${$input1.value}&end=${$input2.value}&currency=${$currency.value}`
    )
    .then(function (response) {
      console.log($input2.value);
      const days = Object.keys(response.data.bpi); // [ 2023-01-01, 2023]

      const values = [];
      days.forEach(function (day) {
        values.push(Number(response.data.bpi[day]));
      });

      // console.log("values=", values);

      new Chart(ctx, {
        type: "line",
        data: {
          labels: days,
          datasets: [
            {
              label: "# of Votes",
              backgroundColor: "rgba(100, 99, 132, 0.5)",
              borderColor: "rgb(255, 99, 132)",
              data: values,
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
      $minValue.innerHTML = Math.min(...values);
      $maxValue.innerHTML = Math.max(...values);
    })
    .catch((err) => console.log(err));
}

fetchAndDisplayChart();
