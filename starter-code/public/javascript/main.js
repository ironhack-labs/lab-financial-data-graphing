$(document).ready(function(){

    $.ajax({
      url: "http://api.coindesk.com/v1/bpi/historical/close.json",
      method: "GET",
      success: function (response) {
        var dates = Object.keys(JSON.parse(response).bpi)
        var values = Object.values(JSON.parse(response).bpi)

        var ctx=document.getElementById("myChart");
        var myChart= new Chart(ctx,{
            type:'line',
            data: {
            labels: dates,
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: values,
                    spanGaps: false,
                }
            ]
        }
        })

        console.log("dates", dates);
        console.log("values", values);
    //  console.log("test2", response.bpi);
        // console.log(response);
      },
      error: function (err) {
        console.log(err);
      }

      // $('#getdata').on('click', ()=>{
      //  const sDate = $('#startDate').val();
      //  const eDate = $('#endDate').val();
      //
      //  console.log(currency);
      //  getCoinDeskInfo(sDate, eDate);
      //   })

});
})
