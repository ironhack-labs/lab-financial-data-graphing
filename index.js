
let startDate = document.querySelector("#start").value;
let endDate = document.querySelector("#end").value;
let $btn = document.querySelector("#search");

function renderChart(start, end){
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then((bitcoin)=>{
        let keys = Object.keys(bitcoin.data.bpi);
        let values = Object.values(bitcoin.data.bpi);
    
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: {
                labels: keys,
                datasets: [{
                    label: 'Bitcoin Value',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: values
                }]
            },
        
            // Configuration options go here
            options: {}
        });
        
    })
    .catch((err)=>{
        console.log("Error getting data:", err);
    })
}

renderChart(startDate, endDate);

$btn.addEventListener("click", ()=>{
    renderChart(startDate, endDate);
})


