
const bitcoinInfo  = axios.create({
    baseURL: 'https://api.coindesk.com/v1/bpi'
  });

/*
const bitcoinInfo2  = axios.create({
    baseURL: 'https://api.coindesk.com/v1/bpi/supported-currencies.json'
  });


function getSupportedCCodes(){

    bitcoinInfo2.get()
        .then(response => {
            console.log(response.data);

        
        //console.log(miArray);
       // document.getElementById("disclaimer").innerHTML=response.data.disclaimer;
        })
        .catch( error => {
        console.log(error);
    });

}*/


function getInfo(currency){

bitcoinInfo.get(currency)
    .then(response => {
        const Datos=response.data.bpi;
        const claveFechaArray=Object.keys(Datos);
        const miArray= claveFechaArray.map( element => {

            let objetoDatos= {
                date: element,
                valor : Datos[element]  
            }

            return objetoDatos;

        });
        console.log(miArray);
        printTheChart(miArray);
        document.getElementById("disclaimer").innerHTML=response.data.disclaimer;
    })
    .catch( error => {
        console.log(error);
    });

}

const printTheChart = (miArray => {
    const coinDatesLabels = miArray.map( element => element.date);
    const coinValues = miArray.map( element => element.valor);
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: coinDatesLabels,
        datasets: [{
          label: "Coin Value Chart",
          backgroundColor: 'rgb(50, 50, 200)',
          borderColor: 'rgb(255, 99, 132)',
          data: coinValues,
        }]
      }
    });
  });

document.getElementById('buscar').onclick=function(){

    const moneda=document.getElementById("possibleCurrencies").value;
    const fecha1=document.getElementById("date1").value;
    const fecha2=document.getElementById("date2").value;

    getInfo(`historical/close.json?currency=${moneda}&start=${fecha1}&end=${fecha2}`);

  
}

