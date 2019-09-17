window.onload = function() {
  const apiURL = "http://api.coindesk.com/v1/bpi/historical/close.json";

  axios
    .get(apiURL)
    .then(({ data }) => {
      const dates = Object.keys(data.bpi);
      const btcValue = Object.values(data.bpi);
      printChart(dates, btcValue);
    })
    .catch(error => console.log(error));

  const myForm = document.getElementById("myForm");
};

myForm.addEventListener("change", e => {
  let dateFrom = "2019-09-05";
  let dateTo = "2019-09-16";
  if (e.target.id === "dateFrom") dateFrom = e.target.value;
  else if (e.target.id === "dateTo") dateTo = e.target.value;
  const newURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${dateFrom}&end=${dateTo}`;

  axios
    .get(newURL)
    .then(({ data }) => {
      const dates = Object.keys(data.bpi);
      const btcValue = Object.values(data.bpi);
      printChart(dates, btcValue);
    })
    .catch(error => console.log(error));
});

const printChart = (labels, data) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Bitcoin Values",
          backgroundColor: "#e9e9e9",
          data
        }
      ]
    }
  });
};
