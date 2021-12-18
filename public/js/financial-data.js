let chart;

const dataRequest = (theURL) => {
  axios
    .get(theURL)
    .then((resData) => {
      createChart(resData.data);
    })
    .catch((err) => console.log("Error while getting the data: ", err));
};

const createChart = (data) => {
  const currency = document.getElementById("currency").value;
  const dates = Object.keys(data.bpi);
  const startDate = dates[0];
  const endDate = dates[dates.length - 1];

  document.getElementById("from-date").setAttribute("value", startDate);
  document.getElementById("to-date").setAttribute("value", endDate);

  // -- Values
  let values = Object.values(data.bpi);
  values.sort();
  const minValue = values[0];
  const maxValue = values[dates.length - 1];

  document.getElementById("minVal").innerHTML = `Min: ${Number(minValue).toLocaleString("en")} ${currency}`;
  document.getElementById("maxVal").innerHTML = `Max: ${Number(maxValue).toLocaleString("en")} ${currency}`;

  const ctx = document.getElementById("graph").getContext("2d");

  chart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [
        {
          label: "Bitcoin Price",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: data.bpi,
        },
      ],
    },
  });
};

const filderByDate = () => {
    const currency = document.getElementById("currency").value;
    const fromDate = document.getElementById("from-date").value;
    const toDate = document.getElementById("to-date").value;

    chart.destroy();

    dataRequest(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`, currency);
};