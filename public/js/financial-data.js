const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';

axios.get(apiUrl)
	.then(response => {
		
		printChart(response.data);
	})
	.catch(err => {
		console.log(err)
	})


    const printChart = data => {
        const CoinDeskHisData = data.bpi;
        // x axis
        const dates = Object.keys(CoinDeskHisData);
        
        // y axis
        const bitcoinVal = dates.map(date => {
            
            return CoinDeskHisData[date]
         })


    
         const ctx = document.querySelector('#myChart').getContext('2d');

    
        new Chart(ctx, {
            type: 'line',
            data: {
                // x - axis
                labels: dates,
                datasets: [
                    {
                        label: 'Historical BPI data',
                        backGroundColor: 'rgb(10, 43, 194)',
                        borderColor: 'rgb(10, 43, 194)',
                        
                        // y - axis 
                        data: CoinDeskHisData,

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
                    },
                    
                ],
                
            },
            
        })
        function filterDates(){
            const dates2 = [...dates];
            console.log(dates2);
            const startDate = document.querySelector('#start-date');
            const endDate = document.querySelector('#end-date');
        }
    };

    

