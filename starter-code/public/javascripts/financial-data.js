const urlHist = "http://api.coindesk.com/v1/bpi/historical/close.json";
let value1 = new Date().toLocaleDateString('en-CA');
let value2 = new Date().toLocaleDateString('en-CA');
let urlFilter;
let urlFilter2;
let change = false;
let curren;
let max = 0;
let min = 0;
initCanvas(urlHist);

function initCanvas(url){
    axios
        .get(url)
        .then(JSONPayload => {
            // console.log(JSONPayload.data.bpi);
            var ctx = document.getElementById('myChart').getContext('2d');
            let keys = Object.keys(JSONPayload.data.bpi);
            let values = Object.values(JSONPayload.data.bpi);
            max = Math.max(...values);
            min = Math.min(...values);
            if(curren === "EUR"){
                document.getElementById("max").value = max+" €";
                document.getElementById("min").value = min+" €";
            }
            else{
                document.getElementById("max").value = max+" $";
                document.getElementById("min").value = min+" $";
            }
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: keys,
                    datasets: [{
                        label: 'Bitcoin Price',
                        data: values,
    
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
    
        })
}

      document.getElementById("date1").addEventListener("change", function(){
        value1 = document.getElementById("date1").value;
        urlFilter = "http://api.coindesk.com/v1/bpi/historical/close.json?start="+value1+"&end="+value2;
        change = true;
        initCanvas(urlFilter);
      });

      document.getElementById("date2").addEventListener("change", function(){
        value2 = document.getElementById("date2").value;
        urlFilter = "http://api.coindesk.com/v1/bpi/historical/close.json?start="+value1+"&end="+value2;
        change = true;
        initCanvas(urlFilter);
      });

      document.getElementById("currency").addEventListener("change", function(){
        curren = document.getElementById("currency").value;
        if(curren==="EUR"){
            if(change){
                urlFilter2 = "http://api.coindesk.com/v1/bpi/historical/close.json?start="+value1+"&end="+value2+"&currency=EUR";
                initCanvas(urlFilter2);
            }
            else{
                urlFilter2 = "http://api.coindesk.com/v1/bpi/historical/close.json?currency=EUR";
                initCanvas(urlFilter2);
            }
        }
        else{
            if(change){
                urlFilter2 = "http://api.coindesk.com/v1/bpi/historical/close.json?start="+value1+"&end="+value2+"&currency=USD";
                initCanvas(urlFilter2);
            }
            else{
                urlFilter2 = "http://api.coindesk.com/v1/bpi/historical/close.json?currency=USD";
                initCanvas(urlFilter2);
            }
        }
      });