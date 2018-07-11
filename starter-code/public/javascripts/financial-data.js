const url = "http://api.coindesk.com/v1/bpi/historical/close.json";

let data = '';
axios.get(url)
.then( (res) => {
   data = {
      labels: Object.keys(res.data.bpi),
      datasets: [{
          label: 'Bitcoin Value',
          data: Object.values(res.data.bpi),
      }]
  }
  new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
  })
  max.innerText= `Max value is ${Math.max.apply(null, Object.values(res.data.bpi))}`;
  min.innerText= `Min value is ${Math.min.apply(null, Object.values(res.data.bpi))}`;
})

let ctx = document.getElementById('myChart').getContext('2d');
let options =  {}

window.onload = function(){
  const max = this.document.getElementById('max')
  const min = this.document.getElementById('min')
  const startDate = this.document.getElementById('startDate')
  const endDate = this.document.getElementById('endDate')
  const boton = this.document.getElementById('boton')
  const currency = this.document.getElementById('currency')
  boton.addEventListener("click", function(e){
    e.preventDefault();
    let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate.value}&end=${endDate.value}&currency=${currency.value}`;
    axios.get(url)
    .then( (res) => {
      data = {
          labels: Object.keys(res.data.bpi),
          datasets: [{
              label: 'Test Value',
              data: Object.values(res.data.bpi),
          }]
      }
      new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
      })
      max.innerText= `Max value is ${Math.max.apply(null, Object.values(res.data.bpi))}`;
      min.innerText= `Min value is ${Math.min.apply(null, Object.values(res.data.bpi))}`;
      
    })
  })

}



