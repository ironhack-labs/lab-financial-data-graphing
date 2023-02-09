const ctx = document.getElementById("financial");

/* const start = document.getElementById("start").value
const end = document.getElementById("end").value
console.log(start, end)
 */



let labels = []
let data = []

function getDataFromCoindesk(){
    labels = []
    data = []
    const start = document.querySelector("#start").value
    const end = document.querySelector("#end").value
    const currency = document.querySelector("#currency").value
    axios
    .get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&currency=${currency}`)
    .then(result=>{
        const obj = result.data.bpi
        Object.entries(obj).forEach(([key,value])=>{
            labels.push(key)
            data.push(value)
        })})
    .then(()=>{
        new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Bitcoin Price Index',
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


/* axios
.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=2021-01-01&end=2021-01-05&currency=EUR`)
.then(result=>{
    const obj = result.data.bpi
    Object.entries(obj).forEach(([key,value])=>{
        labels.push(key)
        data.push(value)
    })})
.then(()=>{
    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Bitcoin Price Index',
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
 */
