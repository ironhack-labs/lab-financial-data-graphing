$(function(){
  var data

  function getData() {
    $.ajax({
        method:  'GET',
        url:     'http://api.coindesk.com/v1/bpi/historical/close.json',
        success: function(response){
          data = response
        },
        error: function (err){
          console.log(err)
        }
      })
  }

  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  })

  getData()
  S
})
