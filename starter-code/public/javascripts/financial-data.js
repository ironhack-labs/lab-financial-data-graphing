
const currency = `USD`;

const dateStartDOMEl = document.getElementById("start-date"); 
const dateEndDOMEl = document.getElementById("end-date");
let dateStart = document.getElementById("start-date").value; 
let dateEnd = document.getElementById("end-date").value;

window.onload/(drawAll())
dateStartDOMEl.addEventListener('change', ()=>{
    drawAll()
})

dateEndDOMEl.addEventListener('change', ()=>{
    drawAll()
})



function drawAll(){
    dateStart = document.getElementById("start-date").value; 
    dateEnd = document.getElementById("end-date").value;
    
    const bitCoin = axios.create({
        baseURL: `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${currency}&start=${dateStart}&end=${dateEnd}`
    });
    
    
    bitCoin.get()
        .then(res => {
            printTheChart(res.data.bpi);
        })
        .catch(err => {
            console.log('Error while getting the data: ', err);
        });

}






function printTheChart(CoinksData) {
    const dailyData = CoinksData
    const stockDates = Object.keys(dailyData);
    const stockValues = Object.values(dailyData);

    const ctx = document.getElementById('myChart').getContext('2d')
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockDates,
            datasets: [
                {
                    label: 'Stock Chart',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: stockValues
                }
            ]
        }
    })
}



