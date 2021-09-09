const apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json?index=[USD/CNY]';

axios.get(apiUrl)
	.then(response => {
		
		printChart(response.data);
	})
	.catch(err => {
		console.log(err)
	})


    const printChart = data => {

        // currencies
        const currencies = document.getElementById('select-currency');

        // data from API
        const CoinDeskHisData = data.bpi;
        // x axis
        const dates = Object.keys(CoinDeskHisData);
        
        // y axis
        const bitcoinVal = dates.map(date => {
            
            return CoinDeskHisData[date]
         })


    
         const ctx = document.querySelector('#myChart').getContext('2d');

         const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
         const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

         const genericOptions = {
            fill: false,
            interaction: {
              intersect: false
            },
            radius: 0,
          };

        const myChart = new Chart(ctx, { 
            type: 'line',
            data: {
                // x - axis
                labels: dates,
                datasets: [
                    {
                        label: 'Historical BPI data',
                        backGroundColor: 'rgb(10, 43, 194)',
                        borderColor: 'rgb(75, 192, 192)',
                        // y - axis
                        data: bitcoinVal,
                        segment: {
                            borderColor: ctx => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
                            borderDash: ctx => skipped(ctx, [6, 6]),
                          }, 
                          
                         
                        borderWidth: 1
                    },
                    
                ],
                
            },
            options: genericOptions
            
        })
        window.filterDates = function () {
            const dates2 = [...dates];

            const startDate = document.getElementById('start-date');
            const endDate = document.getElementById('end-date');

            // get the index number of the startDate
            const indexStartD = dates2.indexOf(startDate.value);
            
            const indexEndD = dates2.indexOf(endDate.value);
            
            // slice the array only showing the selected section / selected slice
            const filterDate = dates2.slice(indexStartD, indexEndD +1);
            
            // replace the labels in the chart
            myChart.data.labels = filterDate;

            const bitcoinVal2 = [...bitcoinVal];
            const filterData = bitcoinVal2.slice(indexStartD, indexEndD + 1);

            myChart.data.datasets[0].data = filterData;

            myChart.update();
            
        }

        
        currencies.addEventListener('change', chooseCurrency);
        
        function chooseCurrency() {
            // connect currencies.value with the bitcoinVal 
            // also check if apiUrl is correct
        }
        chooseCurrency()
    };

    

