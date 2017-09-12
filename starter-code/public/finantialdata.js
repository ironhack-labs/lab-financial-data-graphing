function getData (){

    $.ajax({
      method: "GET",
      url: "https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05",
      success: (response) => (
        insertData(response)
       ),
      error: (error) => (error, response)
    })


}

var data

function insertData (response) {
  data = response
  
}





//initialize
$(function(){
    getData();
});
