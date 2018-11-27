let drawData = (startDate, endDate, currency) => {
    return axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`).then( res => {
        data = res.data.bpi;
        let labels = Object.keys(data)
        let values = Object.values(data)

        return {labels,values}

    });
};
     $('.maxValue').text(`MAX: ${Math.max(...values)}`)
     $('.minValue').text(`MIN: ${Math.min(...values)}`)

        

        let ctx = document.getElementById("btcChart").getContext('2d');
        let chart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: labels,
        datasets: [{
            label: "Bitcoin Price",
            backgroundColor: 'rgb(153, 255, 204)',
            borderColor: 'rgb(255, 179, 102)',
            data: values,      
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        
                        
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
   


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

let startDate = "2017-01-01"
let endDate = todayDate(); //supuestamente today



$('#startDate').val(startDate)
$('#endDate').val(endDate)

let currency = "USD";

drawData(startDate, endDate, currency);

$('select').on('change', () => {
    if ($('select').val() === 'EUR') {
        currency = 'EUR';
        console.log(currency)
        drawData(startDate, endDate, currency);
    } else {
        currency = 'USD'
        drawData(startDate, endDate, currency);
    }
  });

$('#startDate').change(() => {
    startDate = $('#startDate').val();
    drawData(startDate, endDate, currency)
});

$('#endDate').change(() => {
    endDate = $('#endDate').val();
    if (endDate > todayDate()) {
        endDate = todayDate()
        $('#endDate').val(endDate)
    }
    drawData(startDate, endDate, currency)
});
     $('.maxValue').text(`MAX: ${Math.max(...values)}`)
     $('.minValue').text(`MIN: ${Math.min(...values)}`)