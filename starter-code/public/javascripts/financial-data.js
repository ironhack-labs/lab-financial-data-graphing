document.getElementById("moneda").addEventListener("change", obtenerBitcoins);
document.getElementById("inicio").addEventListener("change", obtenerBitcoins);
document.getElementById("final").addEventListener("change", obtenerBitcoins);



function obtenerBitcoins(){
    const inicio = document.getElementById('inicio').value;
    const final = document.getElementById('final').value;
    const moneda = document.getElementById("moneda").value
    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?inicio=${inicio}&final=${final}&index=[USD/CNY]&moneda=${moneda}`)
    .then (res =>{
    dibujarGrafica(res.data);
    })
}

   const dibujarGrafica = ((bitcoinData) => {
    const  bitcoinCosto = Object.values(bitcoinData.bpi);
    const bitcoinEtiquetas =  Object.values(Object.keys(bitcoinData.bpi));
    const ctx = document.getElementById('historicoBitcoins').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      
      data: {
        labels: bitcoinEtiquetas,
        datasets: [{
          label: "Costo historico de Bitcoins",
          backgroundColor: 'rgb(57, 255, 20)',
          borderColor: 'rgb(253, 106, 2)',
          data: bitcoinCosto,
        }]
      }
    });
  });