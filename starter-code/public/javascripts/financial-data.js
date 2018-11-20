var start = '2013-01-01'
var end = '2015-01-01'
var currency = 'USD'



var ctx = document.getElementById("chart").getContext('2d');

$(window).on("resize", function(){                      
    resizeCanvas()
});

refreshGraph()
// resizeCanvas()

$('#currency').change(()=>{
    currency = $("#currency").val();
    if(start[0] == '2' && end[0] == '2') refreshGraph()
})

$('input[id="start"]').change(function(){
    start = this.value
    if(start[0] == '2' && end[0] == '2') refreshGraph()
});

$('input[id="end"]').change(function(){
    end = this.value
    if(start[0] == '2' && end[0] == '2') refreshGraph()
});

function resizeCanvas(){
    $("#canvas").height = window.innerHeight * 0.2
}


function refreshGraph(){
   

    var data,
    labels=[],
    dataset=[];
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`).then((response)=>{
    // axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`).then((response)=>{
        data = response.data.bpi
        // console.log(data.length)
        console.log(data)
        for(var value in data){
            labels.push(value)
            dataset.push(data[value])
        }
    }).then(()=>{
        // console.log(dataset)
        // console.log(labels)
        // console.log(["2013-09-01","2013-09-02","2013-09-03","2013-09-04","2013-09-05"])
       
        $(".min").text(Math.min(...dataset))
        $(".max").text(Math.max(...dataset))
    
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `BPI in ${currency}`,
                data: dataset,
                backgroundColor: 'transparent',
                borderColor: 'rgba(200,0,0,0.7)',
                pointRadius: 0,
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    
    });
}
