$(document).ready(function() {

  let currency = $('#currency').val();

  $('#startdate').on('blur', function() {
    const enddate = $('#enddate').val();
    if(enddate.length > 0) {
      getCoindeskInfo(createQueryString(this.value, enddate, currency));
    }
  });

  $('#enddate').on('blur', function() {
    const startdate = $('#startdate').val();
    if(startdate.length > 0) {
      getCoindeskInfo(createQueryString(startdate, this.value, currency));
    }
  });

  $('#currency').on('change', function() {
    const startdate = $('#startdate').val();
    const enddate = $('#enddate').val();
    currency = this.value;
    if(startdate.length > 0 && enddate.length > 0) {
      getCoindeskInfo(createQueryString(startdate, enddate, currency));
    }
  });
});



function getCoindeskInfo(string) {
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json" + string,
    method: "GET",
    success: function (response) {
      getChart(JSON.parse(response).bpi);
    },
    error: function (err) {
      console.log(err);
    },
  })
}

function getChart(data) {

  const keys = Object.keys(data);
  const arrData = Object.values(data);

  const minValue = Math.min.apply(Math, arrData);
  const maxValue = Math.max.apply(Math, arrData);

  $('#minvalue').html('Min value:' + minValue);
  $('#maxvalue').html('Max value:' + maxValue);

  const ctx = document.getElementById("myChart").getContext('2d');
  const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      "labels": keys,
      "datasets": [{
        "label":"Bitcoin price",
        data: arrData
      }],
    },
    options: {}
  });
}

function createQueryString(startdate, enddate, currency) {
  const queryString = `?start=${startdate}&end=${enddate}&currency=${currency}`;
  return queryString;
};
