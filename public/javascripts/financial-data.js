const chartBtn = document.querySelector("#get-bitcoinChart-btn");
chartBtn.addEventListener("click", getData);
let inicio ="2013-09-01";
let fin = "2013-09-04";
let moneda = "USD";

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