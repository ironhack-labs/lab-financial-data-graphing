

$(function(){
  function getBitCoinInfo(){
  $.ajax({
    url: "https://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    success: function (response) {
      console.log(JSON.parse(response));
    },
    error: function (err) {
      console.log(err);
    },
  })
}

$("#BitCoinButton").on('click', function(){
  getBitCoinInfo();
})

});
