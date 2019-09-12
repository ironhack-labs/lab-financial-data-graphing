const drawCharts = (labels, values) => {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          backgroundColor: "rgba(255, 153, 0, 0.2)",
          label: "Bitcoin Price Chart",
          data: values
        }
      ]
    }
  });
};

// axios
//   .get(
//     "http://api.coindesk.com/v1/bpi/historical/close.json?start=<VALUE>&end=<VALUE>"
//   ).then(response => {
//       const data = response.data.bpi
//       const labels = Object.getOwnPropertyNames(data);
//       const values = Object.values(data);
      
//       drawCharts(labels,values)
//   });


const getDataForRange = (startDate,endDate,currency) => {
  axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
    .then(response => {
      const data = response.data.bpi;
      const labels = Object.keys(data);
      const values = Object.values(data);
      document.getElementById('max').innerText = `${Math.max.apply(Math,values)} ${currency}`;
      document.getElementById('min').innerText = `${Math.min.apply(Math,values)} ${currency}`;
      // console.log(Math.max(values))
      console.log(values)
      drawCharts(labels,values)

      console.log(response);
    });
};

document.querySelector("button").onclick = () => {
  console.log('search')
  const currency = document.getElementById("currency").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;
  getDataForRange(startDate,endDate,currency);
};