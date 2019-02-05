console.log('TACH',axios)


const coindeskApi = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/'
});

//let max = function(value){ Math.max(...value)}
//let min = function(value){ Math.min(...value)}



coindeskApi.get('close.json')//nun ist alles in meiner response. bpi ist der teil .bpi
.then(response => {
  console.log('Response from API is: ', response.data.bpi);
  printTheChart(response.data.bpi)
  
  
})
.catch( error => {
  console.log('Error is: ', err);
});

//Funktionen Min MAx
function addMax(bpiData){ 
  let maxValue = Math.max(...bpiData)
return maxValue}
function addMin(bpiData){ 
  let minValue = Math.min(...bpiData)
return minValue}

//Funktion printchart
function printTheChart(bpiData){
  const bitcoinDates = Object.keys(bpiData)//array von strings--Datum
  const bitcoinValues = Object.values(bpiData)//array von strings--Preis
  const max = addMax(bitcoinValues)
  const min = addMin(bitcoinValues)
  document.getElementById('max').innerHTML = `The maximum price is: ${max}`
  document.getElementById('min').innerHTML = `The maximum price is: ${min}`

  console.log(addMin(bitcoinValues))
  const ctx = document.getElementById('myChart').getContext('2d');
  //Aussehen meines Canvas
  const chart = new Chart(ctx, {
    type: 'line',//kann ich in der Dokumentation sehen was das alles für values haben kann
    data: {
      labels: bitcoinDates, //['2019-01-07', '2019-02-09',..]
      datasets: [{
        label: "BitCoin Chart",//oben label..titel
        backgroundColor: 'rgb(250, 105, 0, 0.6)',//ist die hintergrundfarbe-letzter wert ist für opacity
        borderColor: 'rgb(255, 99, 132)',//ist die Grenzfarbe der Stockchart
        data: bitcoinValues,//[1656.42, 1223.43,..]--Y-Wert 
      }]
    }
  });
}



//Add the dates to the API URL to get the correct data.
document.getElementById('update-date').onclick = function(){
  console.log('clickkkk')
  let startDate = document.getElementById('start-date').value
  let endDate = document.getElementById('end-date').value
  coindeskApi.get(`close.json?start=${startDate}&end=${endDate}`)//ACHTUNG WOMIT ICH AUFRUFE..immer gleich dem let
    .then(response => {
      printTheChart(response.data.bpi);//ACHTUNG GANZ OBEN GEBE ICH bei PRINT-CHART response.data.bpi
    })
    .catch( error => {
      console.log(error);
  });
}

//SELECT CURRENCY
let select = document.getElementById('select-currency')

select.onchange = function (){
  let selectValue = document.getElementById('select-currency').value//Da ich den VALUE jedesmal neu brauche muss er hier drin verfügbar sein
  console.log(selectValue)
  
  coindeskApi.get(`close.json?currency=${selectValue}`)
    .then(response => {
      console.log(`close.json?currency=${selectValue}`)
      printTheChart(response.data.bpi);
    })
    .catch( error => {
      console.log(error);
  });
};
