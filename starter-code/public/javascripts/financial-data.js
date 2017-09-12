
function financialInfo() {

$.ajax({
  url: "https://api.coindesk.com/v1/bpi/historical/close.json?currency=BTC",
  method: "GET",
  data: "" ,
  success: function (response) {
    //addData(ctx, "Bitcoin value", response);
    console.log(response);
  },
  error: function (err) {
    console.log(err);
    }
  });

  function addData(chart, label, data) {
      chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
          dataset.data.push(data);
      });
      chart.update();
  }

}

$('#financial').on('click', function(){
  financialInfo();
});
