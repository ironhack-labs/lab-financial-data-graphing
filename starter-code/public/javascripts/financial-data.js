function getBpiData() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const currency = document.getElementById("currency").value;
    console.log(startDate + " " + endDate + " " + currency);
    if( startDate && endDate ) {
        if ( startDate < endDate ) {
            axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`)
            .then(function (response) {
                const labels = Object.keys(response.data.bpi);
                const datas = Object.values(response.data.bpi);
          
                const canvas = document.getElementById("myChart");
                const ctx = canvas.getContext('2d');
                //ctx.fillRect(0, 0, canvas.width, canvas.height);
                const myLineChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{ 
                            data: datas,
                            label: `Bitcoin Price Index in ${currency}`,
                            borderColor: "#3e95cd",
                            fill: true
                        }]
                    },
                    options: {
                        //responsive: false,
                        title: {
                            display: true,
                            text: 'Bitcoins'
                        }
                    }
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        else {
            alert("endDate must be greater than startDate");
        }
    }
}