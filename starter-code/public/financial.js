




//////

function hello(req, res, next) {
    $.ajax({
      url: "http://api.coindesk.com/v1/bpi/historical/close.jsonstart=2013-09-01&end=2013-09-20",
      method: "GET",
      success: function(response){
        console.log(response);
      },
      error: function(err){
        console.log("give me error");
      }
    })
}

hello();