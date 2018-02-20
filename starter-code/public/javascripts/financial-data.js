
 
 const btcApi = axios.create ({
     baseURL:'http://api.coindesk.com/v1/bpi/historical/close.json'
 })
var btcdate;

        function getBitCoinDatas() {
            btcApi.get()
            .then(response => {
                
                var ctx = document.getElementById("canva").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: Object.keys(response.data.bpi),
                        datasets: [{
                            label: '# of Votes',
                            data: Object.values(response.data.bpi),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
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
                                    beginAtZero:true
                                }
                            }]
                        }
                    }
                });    
               
            })
            .catch(err => {
                console.error(err)
            })
            
            }



         
            
            document.getElementById("BTC").onclick= function (){
                    getBitCoinDatas();
            };

            
            
          