const url = "https://api.coindesk.com/v1/bpi/historical/close.json";
const canvas = document.getElementById('canvas')




let printTheChart = ((valor1, valor2) => {

    let ctx = canvas.getContext('2d')
    let chart = new Chart(ctx, {
        type: 'line',
        data: {
        labels: valor1,
        datasets: [
            {
            label: "bpi",
/*             backgroundColor: 'rgb(255, 99, 132)',
 */            borderColor: 'rgb(49, 160, 35)',
            data: valor2,
            }
        ]
        }
    });
});



fetch(url)
.then(res=>{
    if(!res.ok) return Promise.reject(res.statusText)
            return res.json()
}).then(dalomismo=>{
    val1= Object.keys(dalomismo.bpi)
    val2= Object.values(dalomismo.bpi)

    
    printTheChart(val1,val2)

}).catch(e=>
    console.log(e)
)





