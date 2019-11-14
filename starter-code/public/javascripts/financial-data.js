const getBitcoinData = (startDate, endDate, currency) => {
  const check = () => {
    str = "?";
    if (startDate && endDate) str += `start=${startDate}&end=${endDate}`;
    if (currency) {
      startDate && endDate
        ? (str += `&currency=${currency}`)
        : (str += `currency=${currency}`);
    }

    return str;
  };

  axios
    .get("https://api.coindesk.com/v1/bpi/historical/close.json" + check())
    .then(response => {
      const min = document.getElementById("minValue");
      const max = document.getElementById("maxValue");

      const bpi = response.data.bpi;
      let dates = [];
      let values = [];

      for (var date in bpi) {
        dates.push(date);
        values.push(bpi[date]);
      }

      const maxValue = Math.max.apply(null, values);
      const minValue = Math.min.apply(null, values);

      max.innerText = `Max: ${maxValue}`;
      min.innerText = `Min: ${minValue}`;

      drawCanvas(dates, values);
    })
    .catch(err => console.log(`Error: ${err.message}`));
};

const drawCanvas = (labels, data) => {
  const ctx = document.getElementById("bitcoinChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin price Index",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          data: data,
          pointBackgroundColor: "rgba(255, 199, 132, 0.8)"
        }
      ]
    }
  });
};

let startInputDate = null;
let endInputDate = null;

getBitcoinData(startInputDate, endInputDate);

document.querySelectorAll("input").forEach(item => {
  item.addEventListener("input", function() {
    if (this.id === "startDate") {
      startInputDate = this.value;
    } else if (this.id === "endDate") {
      endInputDate = this.value;
    }

    if (startInputDate && endInputDate)
      return getBitcoinData(startInputDate, endInputDate);
  });
});

document.getElementById("currency").addEventListener("change", function() {
  const currencyInputValue = this.value;
  if (currencyInputValue)
    return getBitcoinData(startInputDate, endInputDate, currencyInputValue);
});
