
var url = "http://api.coindesk.com/v1/bpi/historical/close.json";
fetch(url)
  .then(res => {
    if (!res.ok) return Promise.reject(res.statusText);
    return res.json();
  })
  .then(currencies => {
  valor1 = Object.keys(currencies.bpi);
  valor2 = Object.values(currencies.bpi);
  
  printTheChart(valor1, valor2)
  })
  .catch(e => console.log(e));

let printTheChart = (a, b) => {
    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: a,
      datasets: [
        {
          label: "bitcoins",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: b
        }
      ]
    }
  });
};

document.getElementById('boton').onclick = () =>{
    console.log('boton')
    var desde = document.getElementById('desde');
    var hasta  = document.getElementById('hasta');
    if (desde.value > hasta.value) return
    fetch(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${desde.value}&end=${hasta.value}`)
    .then(result => {
      if(!result.ok) console.log(e);
        return result.json();
    })
    .then(currencies => {
      valor1 = Object.keys(currencies.bpi);
      valor2 = Object.values(currencies.bpi);
      printTheChart(valor1, valor2);
    });
  };
