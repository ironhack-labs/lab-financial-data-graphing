function getFinancialData(){
  $.ajax({
    url: "http://api.coindesk.com/v1/bpi/historical/close.json",
    method: "GET",
    data: "" ,
    success: function (response) {
      console.log(response);
      //The callback function that will be executed if the request is completed succesfully
      //This function will have a parameter with the server response.
    },
    error: function (err) {
      //The callback function that will be executed if the request fails, whether it was a client or a server error
      //It will have a parameter with error that caused the request to fail
    },
  });
}

$("#createGraph").on("click", function(){
  getFinancialData();
});





//** If the HTTP verb is get, the data will be sent through the query string. If not, it will be sent in the form body.
