$(document).ready(() => {

  const baseURL = "http://api.coindesk.com/v1/bpi/historical/close.json";

  function setDate() {
    $('button').on('click', function(){
      console.log("Holi, funciono");
    var From = document.getElementById("fromForm").value;
    var To = document.getElementById("toForm").value;
    return $.ajax({
      url: `${baseURL}?start=${From}&end=${To}`,
      dataType: 'json',
    }).then(date => {console.log(date);});});
  }

  function requestBPIPromise() {
    return $.ajax({
      url: baseURL,
      dataType: 'json',
    }).then(date => {

      // Format convert date
      var arrDate = Object.values(date.bpi);
      console.log(arrDate);

      var ctx = document.getElementById("canvas").getContext("2d");
      var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
          // so sry for incoming cutrez
          labels: ['10-6', '11-6', '12-6', '13-6', '14-6', '15-6', '16-6', '17-6', '18-6', '19-6', '20-6', '21-6', '22-6', '23-6', '24-6', '25-6', '26-6', '27-6', '28-6', '29-6', '30-6', '1-7', '2-7', '3-7', '4-7', '5-7', '6-7', '7-7', '8-7', '9-7', '10-7'],
          datasets: [{
            label: 'BPI',
            data: arrDate,
            backgroundColor: "rgba(153,255,51,0.4)"
          }]
        },
        options: {
          elements: {
            line: {
              tension: 0, // disables bezier curves
            }
          }
        }
      });

      console.info(date);
    }).catch(e => console.log(e));
  }
  // Init the function
  requestBPIPromise();
  setDate();
});
