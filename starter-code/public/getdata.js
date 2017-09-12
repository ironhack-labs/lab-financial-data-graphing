const BASE_ENDPOINT = 'http://api.coindesk.com/v1/bpi/historical/close.json';
let data


$(document).ready(function ajax() {
  $.ajax({
    method: 'GET',
    url: `${BASE_ENDPOINT}`,

    success: (response) => (checkData(response))
  })




});


function checkData(response){
  data =response;
  let dataBpi = ($.parseJSON(data).bpi)
   let ejeX = Object.keys(dataBpi)
   let ejeY = Object.values(dataBpi)
   console.log(ejeX, ejeY);
}

function printPoint(ejeX, ejeY){

}

// var myLineChart = new Chart(printPoint( {
//     type: 'line',
//     data: data,
//     options: options
// }));
