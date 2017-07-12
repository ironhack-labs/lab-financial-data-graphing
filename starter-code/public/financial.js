




//////

function hello(req, res, next) {
    $.ajax({
      url: "http://api.coindesk.com/v1/bpi/historical/close.json?index=[USD/CNY]",
      method: "GET",
      success: function(response){
        //console.log(JSON.parse(response));
        var wtf = JSON.parse(response);
        console.log(Object.keys(wtf.bpi));
        var selector = Object.keys(wtf.bpi);
      },
      error: function(err){
        console.log("give me error");
      }
    })
}

hello();