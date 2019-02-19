
const baseURL = 'http://api.coindesk.com/v1/bpi/historical/close.json'
function printTheChart(e)
{
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let url = `${baseURL}?start=${startDate}&end=${endDate}`
    
    axios.get(url)
    .then((res) =>{
        console.log(res.data.bpi)
        
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data:
            {
                labels: Object.keys(res.data.bpi),
                datasets: 
                [{
                    label: "Bitcoin Price Index",
                    data: Object.values(res.data.bpi),
                    borderWidth: 1
                }]
            },
        });
    })
}
    
document.getElementById('startDate').addEventListener("change", printTheChart);
document.getElementById('endDate').addEventListener("change", printTheChart);

printTheChart();