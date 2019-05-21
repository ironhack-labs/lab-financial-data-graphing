const bitcoin = axios.create({
  baseURL: "http://api.coindesk.com/v1/bpi/historical/"
});
// const start = document.getElementById("start-date").value;
const startInput = document.getElementById("start-date");
const endInput = document.getElementById("end-date");

startInput.onchange = () => {
  if (startInput.value && endInput.value)
    getData(startInput.value, endInput.value);
};
endInput.onchange = () => {
  if (startInput.value && endInput.value)
    getData(startInput.value, endInput.value);
};

const getData = (start, end) => {
  console.log(start, end);
  bitcoin
    .get(`/close.json?start=${start}&end=${end}`)
    .then(response => {
      console.log(response.data.bpi);
      printTheChart(response.data.bpi);
    })
    .catch(error => console.log(error));
};

getData("2018-02-01", "2019-02-01");

const printTheChart = bitData => {
  const bitLabels = Object.keys(bitData);
  const bitPrice = Object.values(bitData);
  const ctx = document.getElementById("chart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: bitLabels,
      datasets: [
        {
          label: "Bitcoin Price Index",
          backgroundColor: "rgb(255, 111, 0)",
          borderColor: "rgb(0, 0, 255)",
          data: bitPrice
        }
      ]
    }
  });
};
