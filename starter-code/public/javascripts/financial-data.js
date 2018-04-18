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

let ctx = document.getElementById("myChart").getContext("2d");

let drawChart = () => {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "Bitcoin Chart",
          backgroundColor: "red",
          borderColor: "black",
          data: price
        }
      ]
    }
  });
};

/* new Chart(ctx, {
      type: "line",
      data: {
          labels: date,
          datasets: [
              {
                  label: "Bitcoin Chart",
                  backgroundColor: "red",
                  borderColor: "red",
                  data: price
              }
          ]
      }
  })*/
//.then(data => data.map(e => ({ date: e.date, close: e.close })))
//.then(closes => drawChart(closes));
