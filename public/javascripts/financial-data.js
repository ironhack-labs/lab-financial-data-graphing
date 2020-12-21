const myChart = document.getElementById("myChart");
const ctx = myChart.getContext('2d');
const selectCurrency = document.getElementById("currency");
let startDate = '';
let endDate = '';



//Iteration 1-2
//fetch data from site CoinDesk and draw chart
async function getData(url) {
        try {
                //get data 
                const getRawData = await axios.get(url);
                const getNecessaryData = getRawData.data.bpi;
                const dates = Object.keys(getNecessaryData);
                const values = dates.map(date => getNecessaryData[date]);

                //draw line chart 
                const myLineChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                                labels: dates,
                                datasets: [{
                                        labels: "Current Price",
                                        data: values,
                                        borderColor: 'rgba(255, 99, 132, 1)',
                                        borderWidth: 2
                                }]
                        },
                        options: {
                                title: {
                                        display: true,
                                        text: 'Bitcoin Price Index',
                                        fontColor: '#666',
                                }
                        }
                })

                //show Max/Min values
                document.getElementById("min").innerHTML = Math.min(...values) + " " + document.getElementById("currency").value;
                document.getElementById("max").innerHTML = Math.max(...values) + " " + document.getElementById("currency").value;

        } catch (err) {
                console.log(err)
        }

};

//show chart after window loaded
const url = `https://api.coindesk.com/v1/bpi/historical/close.json`;
getData(url);

//get values of input boxes and update chart
function getValues(event){
        event.preventDefault();
        startDate = document.getElementById("startDate").value;
        endDate = document.getElementById("endDate").value;
        currency = document.getElementById("currency").value;
        let url='';
        if(startDate && endDate && currency){
                url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}&currency=${currency}`;
        }else if(startDate && endDate && !currency){
                url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
        }else{
                url = `https://api.coindesk.com/v1/bpi/historical/close.json`;
        }
        getData(url);

}

//Iteration 3,4,5
//handle start day
document.getElementById("startDate").addEventListener("change", (event) => {
        getValues(event);
})
//handle end day
document.getElementById("endDate").addEventListener("change", (event) => {
        getValues(event);
})
//handle start day
document.getElementById("currency").addEventListener("change", (event) => {
        getValues(event);
})


