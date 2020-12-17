
let inicio ="2013-09-01";
let fin = "2013-09-04";
let moneda = "USD";
var ctx = document.getElementById('my-chart').getContext('2d');

const chartBtn = document.querySelector("#get-bitcoinChart-btn");
chartBtn.addEventListener("click", async ()=>{
    const data = await getData();
    const ejeX = Object.keys(data);
    const ejeY = Object.values(data);
    console.log(data)
    console.log(ejeX,ejeY)
    printChart(ejeX,ejeY);
});

const start = document.querySelector("#start");
start.addEventListener("change", (event)=>{ inicio =event.target.value
    
});

const end = document.querySelector("#end");
end.addEventListener("change", (event)=>{ fin =event.target.value

});

const coin = document.querySelector("#Currency");
coin.addEventListener("change", (event)=>{ moneda =event.target.value

});


const apiUrl = ` https://api.coindesk.com/v1/bpi/historical/close.json`;
async function getData() {
  try {
    mostrarDatos();
    const  {data:{bpi}}  = await axios.get(apiUrl,
        {
            params:{
                start: inicio,
                end: fin,
                currency: moneda
            }
        });
        console.log(bpi);
    return bpi;
  } catch (err) {
    console.log(err);
  }
}

function mostrarDatos(){
    console.log(inicio,fin);
}

function printChart(X,Y){
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: X,
            datasets: [{
                label: 'Bitcoin',
                data: Y,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                   
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
     
                ],
                borderWidth: 1
            }]
        }
    });
}