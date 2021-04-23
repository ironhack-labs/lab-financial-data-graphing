
const baseApiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';
let apiUrl = baseApiUrl;
let newLineChart;
function getData() {
    axios.get(apiUrl)
    .then(responseFromApi => {
        const dates = Object.keys(responseFromApi.data.bpi);
        let currencyValues = Object.values(responseFromApi.data.bpi);

        let minVal = Math.min(...currencyValues);
        let maxVal = Math.max(...currencyValues);

        
        // currencyValues = JSON.parse(currencyValues);
        document.querySelector("#minVal").innerText = minVal;
        document.querySelector("#maxVal").innerText = maxVal;

        document.querySelector("#startDate").value = dates[0];
        document.querySelector("#endDate").value = dates[dates.length-1];
        
        apiUrl = baseApiUrl;

        let ctx = document.querySelector('#myChart');
        ctx = document.querySelector('#myChart').getContext('2d');
    
        newLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: "Bitcoin Price Index",
                    data: currencyValues, 
                    backgroundColor:'rgba(255, 99, 132, 0.2)',
                }]
            }
        });

    })
    .catch(error => console.log(error));
}

getData();

const getNewValues = () => {

    if(newLineChart) newLineChart.destroy();

    let startDate = document.querySelector("#startDate").value;
    let endDate = document.querySelector("#endDate").value;
    let cur = document.querySelector("#cur").value;

    return {
       startDate: startDate,
       endDate: endDate,
       cur: cur,
    }
}

document.querySelectorAll(".chartSetting").forEach((input) =>{
    input.addEventListener("change", () => {
        console.log('hello');
        
        let newValues = getNewValues();
        if(newValues) {
            console.log(newValues)
            let queryString = `?start=${newValues.startDate}&end=${newValues.endDate}&currency=${newValues.cur}`
            // newLineChart.destroy();
            apiUrl += queryString;
            console.log(apiUrl);
            
            getData();
        }
    
    })
})


// const getNewValues = () => {

//     if(!document.querySelector("#startDate").value || !document.querySelector("#endDate").value) return false;
    
//     let startDate = document.querySelector("#startDate").value || ''
//     console.log(startDate);
//     let endDate = document.querySelector("#endDate").value || ''
//     console.log(endDate);

//     return {
//        startDate: startDate,
//        endDate: endDate
//     }
// }

// return `?start=${startDate}&end=${endDate}`
