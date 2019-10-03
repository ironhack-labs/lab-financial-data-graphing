    const getDataBtn = document.getElementById("getData");

    getDataBtn.addEventListener("click", function(){
        let startDate = document.getElementById("start-date").value;
        let endDate = document.getElementById("end-date").value;
        let selectCurrency = document.getElementById("currencies").value
    
        let apiStartDate = startDate.split("/").reverse().join("-");
        let apiEndDate = endDate.split("/").reverse().join("-");
    
        console.log(apiStartDate, apiEndDate, selectCurrency);
    
        let url = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${apiStartDate}&end=${apiEndDate}&currency=${selectCurrency}`;
        axios.get(url)
            .then((response)=>{
                let dataHorizontalAxis = Object.keys(response.data.bpi);
                let dataVerticalAxis = Object.values(response.data.bpi);

                let maxMin = document.getElementById("max-min");

                maxMin.innerHTML = "Max value: " + Math.max(...dataVerticalAxis) + "<br>" + "Min value: " + Math.min(...dataVerticalAxis)

                var ctx = document.getElementById('myChart').getContext('2d');
                var chart = new Chart(ctx, {
                    type: 'line',    
                    data: {
                        labels: dataHorizontalAxis,
                        datasets: [{
                            label: 'My First dataset',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: dataVerticalAxis
                        }]
                    },
                    options: {}
                });
            })
            .catch((error)=>{
                console.log(error);
            })
    })