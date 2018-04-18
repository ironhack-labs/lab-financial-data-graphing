let api_url = `http://api.coindesk.com/v1/bpi/historical/close.json`;

window.onload = () => {
  axiosF(api_url);
};

const axiosF = url => {
  axios
    .get(url)
    .then(res => res.data)
    .then(data => {
      drawChart(data);
    });

  document.getElementById("draw-chart").addEventListener("click", () => {
    api_url = `http://api.coindesk.com/v1/bpi/historical/close.json`;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    setTimes(from, to);
    let currency = document.getElementById("currency").value;
    setCurrency(currency);
    axiosF(api_url);
  });
};

const setCurrency = currency => {
  api_url += `&currency=${currency}`;
};

const setTimes = (from, to) => {
  api_url += `?start=${from}&end=${to}`;
};

const drawChart = data => {
  const dates = Object.keys(data.bpi);
  const prices = Object.values(data.bpi);

  const min = Math.min.apply(null, prices);
  const max = Math.max.apply(null, prices);

  maxMin(min, max);

  let ctx = document.getElementById("myChart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Stock Chart",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: prices
        }
      ]
    }
  });
};

const maxMin = (min, max) => {
  document.getElementById("max-min").innerHTML = `MIN: ${min}, MAX: ${max}`;
};
