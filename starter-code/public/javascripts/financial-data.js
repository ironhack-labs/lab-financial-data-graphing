const updateData = (from, to, currency) => {
  const coinDesk = axios
    .get("https://api.coindesk.com/v1/bpi/historical/close.json", {
      params: {
        start: from,
        end: to,
        currency: currency
      }
    })
    .then(res => {
      const date = Object.keys(res.data.bpi);
      const value = Object.values(res.data.bpi);
      printGraph(date, value);
    })
    .catch(err => {
      console.log(err);
    });
};

const printGraph = (dat, val) => {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dat,
      datasets: [
        {
          label: "Bitcoin Price ìndex",
          data: val
        }
      ]
    }
  });
};

const from = $("#date-from").val();
const to = $("#date-to").val();
updateData(from, to);

$("#date-from").change(() => {
  updateData($("#date-from").val(), $("#date-to").val(), $("#currency").val());
});

$("#date-to").change(() => {
  updateData($("#date-from").val(), $("#date-to").val(), $("#currency").val());
});

$("#currency").change(() => {
  updateData($("#date-from").val(), $("#date-to").val(), $("#currency").val());
});
