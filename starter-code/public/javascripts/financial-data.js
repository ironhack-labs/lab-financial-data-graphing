
$('#button').click(function(){
    let startDate= $("#start").val();
    let endDate=$("#end").val();
    takeData(startDate, endDate);
});


$('#currency').change(function() {
    let cur = $('#currency').val();
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?currency=${cur}`)
    .then(response => {
      console.log(response.data.bpi);
    })
    .catch(err => {
      console.log(err);
    });
});



function takeData(start,end){

    axios({
        method:'get',
        url:`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`,
        //url:'http://api.coindesk.com/v1/bpi/historical/close.json',
   
    })
    .then((response) => {
        //take values from object
        let dayKey=Object.keys(response.data.bpi);
        let values=Object.values(response.data.bpi);
        //calculate max and min rates
        let max = Math.max.apply(Math,values);
        let min=Math.min.apply(Math,values);
        //insert values into document
        $('#values').text('Values');
        $('#max').text('Max: ' + max);
        $('#min').text('Min: ' + min);
        //test
        console.log('meow' + min);
    
        //display chart
        var ctx = $('#myChart');

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dayKey,//insert data
                datasets: [{
                    label: 'Bitcoin price index',
                    backgroundColor: 
                        'rgba(255, 99, 132, 0.2)',
                    borderColor: 
                        'rgba(255,99,132,1)',
                    data: values,
                    
                }]
            }
        });

        })

    .catch((err)=>{
        console.log(err);
    });
}




