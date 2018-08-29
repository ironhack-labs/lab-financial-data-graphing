document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
    makeGraph("", "");
  },
  false
);

function makeGraph(dates, currency) {
  axios
    .get(
      `http://api.coindesk.com/v1/bpi/historical/close.json${dates}${currency}`
    )
    .then(response => {
      const data = response.data;
      const dates = Object.keys(data.bpi);
      const values = Object.values(data.bpi);
      $("#ammount-max").html(Math.max(...values));
      $("#ammount-min").html(Math.min(...values));
      $(".currency").html($("#curr").val());
      $("#from").val(dates[0]);
      $("#to").val(dates[dates.length - 1]);
      var ctx = document.getElementById("myChart").getContext("2d");
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: `Bitcoin value in ${$("#curr").val()}`,
              data: values,
              backgroundColor: ["rgba(50, 135, 250, 1)"],
              borderColor: ["rgba(155,255,132,1)"],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: false
        }
      });
    });
}

$("#from").change(data => {
  makeGraph(
    `?start=${data.target.value}&end=${$("#to").val()}`,
    `&currency=${$("#curr").val()}`
  );
});
$("#to").change(data => {
  makeGraph(
    `?start=${data.target.value}&end=${$("#from").val()}`,
    `&currency=${$("#curr").val()}`
  );
});
$("#curr").change(data => {
  makeGraph(
    `?start=${$("#from").val()}&end=${$("#to").val()}`,
    `&currency=${$("#curr").val()}`
  );
});
