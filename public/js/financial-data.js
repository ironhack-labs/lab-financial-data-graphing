const ctx = document.getElementById("financial");

/* const start = document.getElementById("start").value
const end = document.getElementById("end").value
console.log(start, end)
 */



let labels = []
let data = []
let chart
function getDataFromCoindesk(){
    labels = []
    data = []
    const start = document.querySelector("#start").value
    const end = document.querySelector("#end").value
    const currency = document.querySelector("#currency").value
    const max = document.querySelector("#max").value
    const min = document.querySelector("#min").value
    axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(result=>{
        const obj = result.data.bpi
        Object.entries(obj).forEach(([key,value])=>{
            if(value>min && value<max){
                labels.push(key)
                data.push(value)
            }
        })})
    .then(()=>{
        if(chart != undefined){chart.destroy()}
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: `Bitcoin Price Index (${currency})` ,
                data: data,
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
    }) 
}


getDataFromCoindesk()

    
    