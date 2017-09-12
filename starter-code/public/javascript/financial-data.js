$(document).ready(function(){
  console.log("entro");
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",

    success: function (response) {
      data = JSON.parse(response);
      //The callback function that will be executed if the request is completed succesfully
      //This function will have a parameter with the server response.
      console.log(data.time.updated);
    },
    error: function (err) {
      //The callback function that will be executed if the request fails, whether it was a client or a server error
      //It will have a parameter with error that caused the request to fail
      console.log(err);
    },
  });
});
