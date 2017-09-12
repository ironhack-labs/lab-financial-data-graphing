$(() => {
  $.ajax({
    method: 'GET',
    url: 'http://api.coindesk.com/v1/bpi/historical/close.json',
    success: function(response){console.log(response)},
    error: function(error){console.log(error)}
  })
})