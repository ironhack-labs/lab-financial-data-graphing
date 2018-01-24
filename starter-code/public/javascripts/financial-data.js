function getBpiData() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    if( startDate > endDate ) {
        alert("END DATE must be greater than START DATE");
    }
    else {
        axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
        .then(function (response) {
            console.log(response.data.bpi);
      
            const labels = Object.keys(response.data.bpi);
            const datas = Object.values(response.data.bpi);
      
            var ctx = document.getElementById("myChart").getContext('2d');
      
            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{ 
                        data: datas,
                        label: "Bitcoin Price Index",
                        borderColor: "#3e95cd",
                        fill: true
                    }]
                },
                options: {
                    responsive: false,
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

}