const api_url = `http://api.coindesk.com/v1/bpi/historical/close.json`;
let date = [];
let price = [];
axios
  .get(api_url)
  .then(res => res.data)
  .then(data => (data = data.bpi))
  .then(data => {
    date = Object.keys(data);
    price = Object.values(data);
  })
  .then(closes => drawChart());

let drawChart = () => {
  let ctx = document.getElementById("myChart").getContext("2d");
  let chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Bitcoin Chart",
          backgroundColor: "#458B00",
          borderColor: "#333",
          data: price
        }
      ]
    }
  });
};
document.getElementById("button").addEventListener("click", () => {
    let start = document.getElementById("date__start").value;
    let end = document.getElementById("date__end").value;
    axios
      .get(`${api_url}?start=${start}&end=${end}`)
      .then(res => res.data)
      .then(data => (data = data.bpi))
      .then(data => {
        date = Object.keys(data);
        price = Object.values(data);
      })
      .then(closes => drawChart());
  });
