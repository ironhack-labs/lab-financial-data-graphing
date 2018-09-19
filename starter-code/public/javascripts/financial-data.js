// var ctx = document.getElementById("btcChart").getContext('2d');
// eventlister the start y end
// pasar el start y end a Data(start y end)

  
  
  
let drawData = (startDate, endDate) => {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`).then( res => {
        data = res.data.bpi;
        let labels = Object.keys(data)
        let values = Object.values(data)
        console.log(labels)
        console.log(values)

        let ctx = document.getElementById("btcChart").getContext('2d');
        let chart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: labels,
        datasets: [{
            label: "Bitcoin Price",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: values,      
            }]
        }
        })  
    }) 
}

let todayDate = (() => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!

    let yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    today = yyyy+'-'+mm+'-'+dd;
    return today;
})


let startDate = "2018-01-01"
let endDate = todayDate(); //supuestamente today

$('#startDate').val(startDate)
$('#endDate').val(endDate)


drawData(startDate, endDate);

$('#startDate').change(() => {
    startDate = $('#startDate').val();
    drawData(startDate, endDate)
});

$('#endDate').change(() => {
    endDate = $('#endDate').val();
    if (endDate > todayDate()) {
        endDate = todayDate()
        $('#endDate').val(endDate)
    }

    drawData(startDate, endDate)
});

  
  
  // for (i = 0; i < data.length; i++) {
  //   console.log(data.keys)
  // }
  
  
  
  
  
  
  // var myLineChart = new Chart(ctx, {
  //     type: 'line',
  //     data: Object.data().,
  // });