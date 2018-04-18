window.onload = () => {
  let firstDate = document.getElementById("first-date").value;
  let seconDate = document.getElementById("second-date").value;
  let drop = document.getElementById("currency");
  let currency = "USD";

  let api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${firstDate}&end=${seconDate}`;

  function getMaxMin(api_url, currency) {
    axios
      .get(api_url)
      .then(res => res.data.bpi)
      .then(values => {
        data = Object.values(values);
        let min = Math.min.apply(0, data);
        let max = Math.max.apply(0, data);
        let minMax = {
          min: min,
          max: max
        };
        console.log(minMax);
        document.getElementById("max").textContent =
          minMax.max + " " + currency;
        document.getElementById("min").textContent =
          minMax.min + " " + currency;
      });
  }

  document.getElementById("update").addEventListener("click", () => {
    firstDate = document.getElementById("first-date").value;
    seconDate = document.getElementById("second-date").value;
    currency = drop.value;

    let api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${firstDate}&end=${seconDate}`;
    console.log(firstDate, seconDate);
    start();
    getMaxMin(api_url, currency);
  });

  const start = () => {
    let api_url = `http://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${firstDate}&end=${seconDate}`;

    axios.get(api_url).then(res => {
      let keysBpi = Object.keys(res.data.bpi);
      let valuesBpi = Object.values(res.data.bpi);

      let ctx = document.getElementById("myChart").getContext("2d");

      let chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: keysBpi,
          datasets: [
            {
              label: "Coin Value",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: valuesBpi
            }
          ]
        }
      });
    });
  };

  start();
  getMaxMin(api_url, currency);
};
