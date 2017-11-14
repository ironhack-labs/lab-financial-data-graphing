$(document).ready(function(){
  axios({
    method: "get",
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    responseType: "json"
  })
  .then(function(response) {
    console.log(response.data.bpi);
  });
});
