$(function(){

function getData() {
$.ajax({
      // Notice that we are using POST
    method:  'GET',
    url:     'http://api.coindesk.com/v1/bpi/historical/close.json',
      // The data key is for sending data in a POST, PUT or PATCH!
    success: function(response){
      console.log(response);
    },
    error: function (err){
      console.log(err);
    }
  });
};
getData();
})
