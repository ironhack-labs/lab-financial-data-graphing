const startDate = document.getElementById("fromDate").value;
const endDate = document.getElementById("toDate").value;
const currency = document.getElementById("currency").value;
const apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${value}`;

const getFinancialData = apiUrl => {
  axios
    .get(apiUrl)
    .then(res => {
      const dates = Object.keys(res.data.bpi).map(el => {
        return el;
      });
      console.log("dates: " + dates);
      const closes = Object.values(res.data.bpi).map(el => {
        return el;
      });
      document.getElementById("minVal").innerText = Math.min(
        ...closes
      ).toString();
      document.getElementById("maxVal").innerText = Math.min(
        ...closes
      ).toString();
      const maxVal = Math.max(...closes);
      drawCanvas(dates, closes);
    })
    .catch(err => {
      console.log(err);
    });
};

const drawCanvas = (labels, data) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: data
        }
      ]
    }
  });
};

document.querySelector("button").onclick = () => {
  getFinancialData(fromDate, toDate, currency);
};
